const yaml = require('yaml')
const fs = require('fs').promises

exports.parse = async (ymlFileName) => {
    const data = await fs.readFile(ymlFileName, 'UTF-8')
    return yaml.parse(data)
}
