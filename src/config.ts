const IS_DEV: boolean = process.env.NODE_ENV !== 'production'

export const API_ROOT: string = IS_DEV ? 'http://localhost:8000/api/' : 'https://api.jkchao.cn/api/'
