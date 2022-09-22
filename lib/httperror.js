/**
 * Retorna um HTTP status code 500 para exceções
 * desconhecidas capturadas em um bloco catch.
 * @param response Objeto Response para devolver uma resposta à requisição HTTP
 * @param error Objeto contendo informações sobre o erro capturado, 
 *              que será exibido no console.
 */
exports.server = (response, error) => {
    response.status(500).send({ message: 'Erro interno do servidor'})
    console.error(error.message, error.stack)
}  

/**
 * Retorna um HTTP status code 500 para exceções
 * desconhecidas capturadas em um bloco catch.
 * @param response Objeto Response para devolver uma resposta à requisição HTTP
 * @param message String contendo a mensagem de erro
 */
exports.custom = (response, message, code) => {
    response.status(code).send({ message })
    console.error(message)
}  