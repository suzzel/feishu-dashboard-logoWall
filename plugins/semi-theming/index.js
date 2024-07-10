import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { platform } from 'os';
import { pathToFileURL } from 'url';
import { createRequire } from 'module';
const _require = createRequire(import.meta.url);
const isWindows = platform() === 'win32';
export function semiTheming({ theme, ...options }) {
	const include = options.include && normalizePath(options.include);
	const variables = convertMapToString(options.variables || {});
	let viteConfig;
	return {
		name: 'semi-theme',
		enforce: 'post',
		configResolved(config) {
			viteConfig = config;
		},
		async load(id) {
			const filePath = normalizePath(id);
			// https://github.com/DouyinFE/semi-design/blob/main/packages/semi-webpack/src/semi-webpack-plugin.ts#L83
			if (/@douyinfe\/semi-(ui|icons|foundation)\/lib\/.+\.css$/.test(filePath) || /@kousum\/semi-ui-vue\/dist\/.+\.css$/.test(filePath) || /_base\/base.css$/.test(filePath)) {
				const scssFilePath = filePath.replace(/\.css$/, '.scss');
				const { default: sass } = await import('sass');
				try {
					return sass.compileString(loader(readFileSync(scssFilePath, 'utf-8'), {
						...options,
						name: theme,
						include,
						variables,
					}), {
						importers: [
							{
								findFileUrl(url) {
									if (url.startsWith('~')) {
										// Resolve theme scss from root node_modules
										if (theme && url.startsWith(`~${theme}`)) {
											return pathToFileURL(path.resolve(viteConfig.root, 'node_modules', url.substring(1)));
										}
										return pathToFileURL(path.resolve(scssFilePath.substring(0, scssFilePath.lastIndexOf('/node_modules/') +
											'/node_modules/'.length), url.substring(1)));
									}
									const filePath = path.resolve(path.dirname(scssFilePath), url);
									if (existsSync(filePath)) {
										return pathToFileURL(filePath);
									}
									return null;
								},
							},
						],
						logger: sass.Logger.silent,
					}).css;
				} catch (error) {
					console.log(error);
					console.log('Error compiling SCSS file:', scssFilePath);
				}
			}
		},
	};
}
export default semiTheming;
// copy from https://github.com/DouyinFE/semi-design/blob/main/packages/semi-webpack/src/semi-theme-loader.ts
function loader(source, options) {
	const theme = options.name || '@douyinfe/semi-theme-default';
	// always inject
	const scssVarStr = `@import "~${theme}/scss/index.scss";\n`;
	// inject once
	const cssVarStr = `@import "~${theme}/scss/global.scss";\n`;
	let animationStr = `@import "~${theme}/scss/animation.scss";\n`;
	let componentVariables;
	let fileStr = source;
	try {
		_require.resolve(`${theme}/scss/animation.scss`);
	}
	catch (e) {
		animationStr = ''; // fallback to empty string
	}
	try {
		componentVariables = _require.resolve(`${theme}/scss/local.scss`);
	}
	catch (e) {
		// ignore
	}
	if (options.include || options.variables || componentVariables) {
		let localImport = '';
		if (componentVariables) {
			localImport += `\n@import "~${theme}/scss/local.scss";`;
		}
		if (options.include) {
			localImport += `\n@import "${options.include}";`;
		}
		if (options.variables) {
			localImport += `\n${options.variables}`;
		}
		try {
			const regex = /(@import '.\/variables.scss';?|@import ".\/variables.scss";?)/g;
			const fileSplit = fileStr.split(regex).filter(item => Boolean(item));
			if (fileSplit.length > 1) {
				fileSplit.splice(fileSplit.length - 1, 0, localImport);
				fileStr = fileSplit.join('');
			}
		}
		catch (error) {
			// ignore
		}
	}
	// inject prefix
	const prefixCls = options.prefixCls || 'semi';
	const prefixClsStr = `$prefix: '${prefixCls}';\n`;
	if (source.includes('semi-base')) {
		return `${animationStr}${cssVarStr}${scssVarStr}${prefixClsStr}${fileStr.replace("@import '@douyinfe/semi-foundation/base/base';", "@import '~@douyinfe/semi-foundation/base/base';")}`;
	}
	else {
		return `${scssVarStr}${prefixClsStr}${fileStr}`;
	}
}
// copy from https://github.com/DouyinFE/semi-design/blob/main/packages/semi-webpack/src/semi-webpack-plugin.ts#L136
function convertMapToString(map) {
	return Object.keys(map).reduce(function (res, cur) {
		return res + `${cur}: ${map[cur]};\n`;
	}, '');
}
function normalizePath(p) {
	return path.posix.normalize(isWindows ? p.replace(/\\/g, '/') : p);
}