/**
 * Configurações para habilitar Swagger no projeto.
 */
 const swaggerDefinition = {
    info: {
      title: "API REST para gerenciamento de softwares em laboratórios de informática com LTSP (https://ltsp.org)",
      description: "Permite listar os softwares possíves de instalação remota e instalar tais softwares"
    },
    servers: ["http://localhost:8080"]
  }
  
  const swaggerJsDoc = require('swagger-jsdoc');
  const swaggerUi = require('swagger-ui-express');
  
  const swaggerOptions = {
    swaggerDefinition,
    apis: ["./routes/*.js"]
  };
  
  /**
   * Configura o Swagger UI para a aplicação expressjs.
   * @param {express} app Aplicação express
   */
  const setup = app => app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));
  
  module.exports = setup;