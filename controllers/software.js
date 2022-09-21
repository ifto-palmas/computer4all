const httperror = require('../lib/httperror')
const yml = require('../lib/yml')

const load = async () => await yml.parse('config/softwares.yml')

const isThereAnySoftware = (response, softwares) => {
    if(softwares.length === 0) {
        response.status(404).send({ message: 'Nenhum software cadastrado!' })
        return false
    }

    return true
}

exports.get = async (req, res) => {
    try {
        const softwares = await load()

        if(!isThereAnySoftware(res, softwares))
            return

        const sw = softwares.find(s => s.aptName.toLowerCase() === req.params.aptName.toLowerCase())

        if(sw)
            res.status(200).send(sw)
        else httperror.custom(res, `Software não localizado com nome: ${req.params.aptName}`, 404)
    } catch (error) {
        httperror.server(res, error)
    }
}

exports.all = async (req, res) => {
    try {
        const softwares = await load()
        if(isThereAnySoftware(res, softwares))
            res.status(200).send(softwares)
    } catch (error) {
        httperror.server(res, error)
    }
}
