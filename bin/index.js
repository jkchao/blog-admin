const fs = require('fs')
const path = require('path')

const enPath = path.resolve(__dirname, '../src/ajax')
const outPath = path.resolve(__dirname, '../src/api/test')

const files = fs.readdirSync(enPath)

files.forEach(file => {
  const data = fs.readFileSync(`${enPath}/${file}`)

  if (!JSON.parse(data)) {
    console.log('error')
    return
  }

  const fileName = file.split('.')[0]
  const content = JSON.parse(data)

  let result = "import Ax from '../axios'\n\n"

  content.forEach(item => {
    result += `// ${item.des}\n` +
              `export function ${item.name} (params: any)` +
              `: Promise<Ajax.AjaxResponse> {\n` +
              `  return Ax.${item.method}('${item.url}', ` +
              `${item.method === 'get' ? '{ params }' : '{ ...params }'})\n` +
              `           .then(res => res.data)\n` +
              `           .catch(error => console.error)\n` +
              `}\n\n`
  })

  // 目录不存在时，创建
  if (!fs.existsSync(outPath)) {
    fs.mkdirSync(outPath)
  }

  fs.writeFileSync(`${outPath}/${fileName}.ts`, result)

  console.log(`写入文件成功：${outPath}/${fileName}.ts`)
})
