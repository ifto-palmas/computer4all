const httperror = require('../lib/httperror')
const yml = require('../lib/yml')

const load = async () => await yml.parse('config/softwares.yml')

exports.get = async (req, res) => {
    try {
        const softwares = await load()

        if(softwares.length === 0) {
            return res.status(404).send({message: 'Nenhum software cadastrado!'})
        }

        const software = softwares.find(s => s.aptName.toLowerCase() === req.params.aptName.toLowerCase())

        if(software)
            res.status(200).send(software) 
        else httperror.custom(res, `Software não localizado com nome: ${req.params.aptName}`, 404)
    } catch (error) {
        httperror.server(res, error)
    }
}

exports.all = async (req, res) => {
    try {
        const softwares = await load()

        if(softwares.length === 0)
            httperror.custom(res, `Software não localizado com nome: ${req.params.aptName}`, 404)
        else res.status(200).send(softwares) 
    } catch (error) {
        httperror.server(res, error)
    }
}
