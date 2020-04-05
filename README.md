# Protochat

>Aplicação de chat utilizando google protocol-buffers para transferência de dados entre um servidor em python e clients em javascript(Node).

<p align="center">
<img style="border-radius: 5px" src="https://github.com/Briuor/protochat/blob/master/screenshot/demoprotochat.gif?raw=true" />
</p>

## Requisitos
Python 2
Node v8+

## Instalando dependências
```sh
# clone o projeto
git clone https://github.com/Briuor/protochat.git
# entre no diretório do projeto
cd protochat/
# instale as dependências
npm install
```
## Execução
Execute os comandos abaixo dentro do diretório raiz do projeto "protochat/".
### Iniciar Server
```sh
python src/server/server.py <ip> <port>
# Exemplo: python src/server/server.py 127.0.0.1 9999
```

### Iniciar Client
```sh
node src/client/client.js <ip> <port>
# Exemplo: node src/client/client.js 127.0.0.1 9999
```
