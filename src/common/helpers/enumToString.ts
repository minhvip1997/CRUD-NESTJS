
export const EnumToString = (_enum: Object) =>
    Object.keys(_enum)
    .map(key=>_enum[key])
    .filter(value=> typeof value === 'string') as string[]