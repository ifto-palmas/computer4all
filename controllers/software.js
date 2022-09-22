const httperror = require('../lib/httperror')
const yml = require('../lib/yml')

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const load = async () => await yml.parse('config/softwares.yml')

const isThereAnySoftware = (response, softwares) => {
    if(softwares.length === 0) {
        response.status(404).send({ message: 'Nenhum software cadastrado!' })
        return false
    }

    return true
}

/**
 * Instala um software localmente
 * @param softwares objeto contendo informações do software a ser instalado via apt,
 *        obtido do config/softwares.yml
 */
const localInstall = async (software) => {
    if(!software) {
        throw new Error("É preciso um objeto contendo informações do software a ser instalado")
    }

    console.log('Updating repositories list')
    /*const { stdout, stderr } =*/ await exec('apt update')

    console.log(`Preparing for intallation of ${software.description} (${software.aptName})`)
    if (software.preinstall) {
        console.log(`Installing dependencies for ${software.aptName}`)
        /*const { stdout, stderr } =*/ exec(software.preinstall)
    }

    console.log(`Installing ${software.aptName}`)
    const command = `apt install ${software.aptName}`
    /*const { stdout, stderr } =*/ exec(command)
    console.log(command)

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
    } catch (e) {
        httperror.server(res, e)
    }
}

exports.all = async (req, res) => {
    try {
        const softwares = await load()
        if(isThereAnySoftware(res, softwares))
            res.status(200).send(softwares)
    } catch (e) {
        httperror.server(res, e)
    }
}

exports.install = async (req, res) => {
    try {
        const softwares = await load()

        if(!isThereAnySoftware(res, softwares))
            return

        const software = softwares.find(s => s.aptName.toLowerCase() === req.params.aptName.toLowerCase())

        if (!software) {
            const notFoundMsg = `Não existe configuração para instalação do ${req.params.aptName}. Entre em contato com o administrador do sistema.`
            httperror.custom(res, notFoundMsg, 404)
            return
        }

        await localInstall(software)
        res.status(201).send()
    } catch (e) {
        httperror.server(res, e)
    }
}