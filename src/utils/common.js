/**
 * 将一个一维列表分割成多个指定大小的子列表组成的二维数组。
 * 这个函数接受一个一维数组和一个整数作为参数，返回一个新的二维数组，
 * 其中每个子数组的长度都不超过指定的大小。
 * 
 * @param {Array} list - 需要被分割的一维数组。
 * @param {number} size - 指定每个子数组的最大长度。
 * @returns {Array} - 由分割后的一维数组组成的二维数组。
 */
export const splitListInto2DArray = (list, size) => {
    const result = []
    for (let i = 0; i < list.length; i += size) {
        result.push(list.slice(i, i + size))
    }
    return result
}