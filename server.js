const express = require('express');
const app = express();

app.use(express.static("public"));
app.use(express.json());

app.get('/', (_, res) => res.sendFile('/index.html'));

//Porta usada internamente para evitar rodar o node como root
const internalPort = 8080;

//Porta usada externamente, quando o app é executado no Docker
const externalPort = process.env.PORT || internalPort;
const host = process.env.SERVER || "localhost"
const address = externalPort == 80 ? host : `${host}:${externalPort}`;

app.listen(internalPort, () => {
    console.log(`\n\nServidor iniciado. Abra o navegador em http://${address}\n`);
});
