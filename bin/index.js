const fs = require('fs')
const path = require('path')

const enPath = path.resolve(__dirname, '../src/ajax')
const outPath = path.resolve(__dirname, '../src/api/test')

const template = template => {
  return `// ${template.des}\n` +
          `export function ${template.name} (params?: any)` +
          `: Promise<Ajax.AjaxResponse> {\n` +
          `  return ax.${template.method}('${template.url}', ` +
          `${template.method === 'get' ? '{ params }' : 'params'})\n` +
          `           .then(res => res.data)\n` +
          `           .catch(error => console.error)\n` +
          `}\n\n`
}

// 目录不存在时，创建
if (!fs.existsSync(outPath)) {
  fs.mkdirSync(outPath)
}

const files = fs.readdirSync(enPath)

files.forEach(file => {
  const data = fs.readFileSync(`${enPath}/${file}`)

  const fileName = file.split('.')[0]

  let result = ''

  if (data.length) {
    result = "import ax from '../axios'\n\n"
    const content = JSON.parse(data)

    content.forEach(item => {
      result += template(item)
    })
  }

  fs.writeFileSync(`${outPath}/${fileName}.ts`, result)

  console.log(`写入文件成功：${outPath}/${fileName}.ts`)
})
