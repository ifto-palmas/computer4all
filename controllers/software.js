const httperror = require('../lib/httperror')
const yml = require('../lib/yml')

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const loadSoftwaresInfo = async () => await yml.parse('config/softwares.yml')

const loadServerInfo = async (labname) => {
    const labs = await yml.parse('config/labs.yml')
    return labs[labname]
}

const isThereAnySoftware = (response, softwares) => {
    if(softwares.length === 0) {
        response.status(404).send({ message: 'Nenhum software cadastrado!' })
        return false
    }

    return true
}

/**
 * Envia requisição de instalação de um software para um servidor remoto via SSH
 * @param software Objeto contendo informações do software a ser instalado via apt,
 *        obtido do config/softwares.yml
 * @param labname Nome do labin onde o software será instalado
 */
const sendSshInstallCommands = async (software, labname) => {
    if(!software) {
        throw new Error("É preciso um objeto contendo informações do software a ser instalado")
    }

    const server = await loadServerInfo(labname)

    console.log('Updating repositories list')
    /*const { stdout, stderr } =*/ await sendSshCommand(server, 'apt-get update')

    console.log(`Preparing for intallation of ${software.description} (${software.aptName})`)
    if (software.preinstall) {
        console.log(`Installing dependencies for ${software.aptName}`)
        /*const { stdout, stderr } =*/ await sendSshCommand(server, software.preinstall)
    }

    console.log(`Installing ${software.aptName}`)
    const command = `apt install ${software.aptName}`
    /*const { stdout, stderr } =*/ await sendSshCommand(server, command)
}

/**
 * Executa um comando remoto via SSH em um determinado servidor de um labin
 * @param server Objeto com informações do servidor do lab onde o comando será executado
 * @param command Comando a ser executado remotamente via SSH
 */
const sendSshCommand = async ({ username, ip }, command) => {
    const ssh = `ssh ${username}@${ip} '${command}'`
    console.log(ssh)
    return await exec(ssh)
}

exports.get = async (req, res) => {
    try {
        const softwares = await loadSoftwaresInfo()

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
        const softwares = await loadSoftwaresInfo()
        if(isThereAnySoftware(res, softwares))
            res.status(200).send(softwares)
    } catch (e) {
        httperror.server(res, e)
    }
}

exports.install = async (req, res) => {
    try {
        const softwares = await loadSoftwaresInfo()

        if(!isThereAnySoftware(res, softwares))
            return

        const { aptName, labname } = req.params
        const software = softwares.find(s => s.aptName.toLowerCase() === aptName.toLowerCase())

        if (!software) {
            const notFoundMsg = `Não existe configuração para instalação do ${aptName}. Entre em contato com o administrador do sistema.`
            httperror.custom(res, notFoundMsg, 404)
            return
        }

        await sendSshInstallCommands(software, labname)
        res.status(201).send()
    } catch (e) {
        httperror.server(res, e)
    }
}