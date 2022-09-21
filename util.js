/**
 * Retorna um HTTP status code 500 para exceções
 * desconhecidas capturadas em um bloco catch.
 * @param response Objeto Response para devolver uma resposta à requisição HTTP
 * @param error Objeto contendo informações sobre o erro capturado, 
 *              que será exibido no console.
 */
exports.serverError = (response, error) => {
    response.status(500).send({ message: "Erro interno do servidor" });
    console.error(error.message, error.stack);
}  