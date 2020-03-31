// compile to javascript:
// ~/Downloads/protoc/bin/protoc --js_out=import_style=commonjs,binary:. client.proto

const net = require('net');
const inquirer = require('inquirer');
const Schema = require('./client_pb.js');

const clientSocket = new net.Socket();
clientSocket.connect(Number.parseInt(process.argv[3]), process.argv[2].toString(), null);
clientSocket.on('close', () => console.log('Connection closed'));

console.log('\033[1m', 'Enviar objeto para server');
const questions = [
    {
        type: 'input',
        name: 'name',
        message: "Nome"
    }, {
        type: 'input',
        name: 'message',
        message: "Mensagem",
    }
];

inquirer.prompt(questions).then(answers => {
    let client = new Schema.Client();
    client.setName(answers.name);
    client.setIp(clientSocket.address().address);
    client.setMessage(answers.message);

    const bytes = client.serializeBinary();

    clientSocket.write(bytes);
});