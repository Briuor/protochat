const net = require('net');
const clientSocket = new net.Socket();

const Schema = require('./client_pb.js');

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

clientSocket.connect(Number.parseInt(process.argv[3]), process.argv[2].toString(), async () => {
    await rl.question('Digite seu nome: ', (name) => {
        let client = createClient(name);
        rl.close();
        console.log('Você esta online digite uma mensagem: ');
        const stdin = process.openStdin();
        stdin.addListener("data", function (msg) {
            msgStr = msg.toString().trim()
            client.setMessage(msgStr);
            clientSocket.write(client.serializeBinary());
            console.log("<Eu> " + msgStr);
        });
    });
});

const createClient = (name) => {
    let client = new Schema.Client();
    client.setName(name);
    client.setIp(clientSocket.address().address);
    return client;
}

clientSocket.on('data', (clientData) => {
    let client = Schema.Client.deserializeBinary(clientData);
    console.log(`<${client.getName()}> ${client.getMessage()}`);
});

clientSocket.on('close', () => {
    console.log('Conexao encerrada');
    process.exit();
});