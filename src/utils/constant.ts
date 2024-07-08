import { FieldType } from "@lark-base-open/js-sdk"

export const DEFAULT_IMAGE_PATH = '../../public/image/default_logo.svg'
export const SUPPORT_FIELD_TYPE = [
    FieldType.Attachment,
    FieldType.Text,
    FieldType.Url,
] as const