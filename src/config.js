const IS_PRO = process.env.NODE_ENV === 'production'

export const API_ROOT = IS_PRO ? 'http://localhost:8000/' : ''
