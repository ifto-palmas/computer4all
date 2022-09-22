const router = require('express').Router()
const controller = require('../controllers/software')

/**
 * @swagger
 * /api/software/{aptName}:
 *  get: 
 *    summary: Obtém informações sobre um software cadastrado
 *    parameters:
 *      - name: aptName
 *        in: path
 *        description: Nome do software no apt
 *        required: true
 *        type: string
 *    responses:
 *      '200': 
 *        description: Software obtido com sucesso 
 */
router.get('/:aptName', controller.get)


/**
 * @swagger
 * /api/software/install/{aptName}:
 *  post:
 *    summary: Solicita instalação de um software
 *    parameters:
 *      - name: aptName
 *        in: path
 *        description: Name do software para instalar via apt
 *        required: true
 *        type: string
 *    responses:
 *      '201':
 *        description: Software instalado com sucesso
 */
router.post('/install/:aptName', controller.install)

/**
 * @swagger
 * /api/software:
 *  get: 
 *    summary: Obtém a lista de softwares cadastrados
 *    responses:
 *      '200': 
 *        description: Lista de softwares obtida com sucesso
 */
 router.get('/', controller.all)

module.exports = router
