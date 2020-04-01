# Python program to implement server side of chat room.
import socket
import select
import sys
import client_pb2
from thread import *

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)

if len(sys.argv) != 3:
    print "Como Usar: python server.py <ip> <porta>"
    exit()

IP_address = str(sys.argv[1])

Port = int(sys.argv[2])

server.bind((IP_address, Port))
server.listen(100)

list_of_clients = []

print "Esperando clients..."

def clientthread(conn, addr):

    while True:
        try:
            clientData = conn.recv(2048)
            client = client_pb2.Client.FromString(clientData)

            if client:
                print "<" + client.name + ">" + client.message
                broadcast(clientData, conn)
            else:
                remove(conn)
        except:
            continue


def broadcast(c, connection):
    for clients in list_of_clients:
        if clients != connection:
            try:
                clients.send(c)
            except:
                clients.close()
                remove(clients)


def remove(connection):
    if connection in list_of_clients:
        list_of_clients.remove(connection)

while True:
    conn, addr = server.accept()

    list_of_clients.append(conn)

    print addr[0] + " entrou"

    start_new_thread(clientthread, (conn, addr))

conn.close()
server.close()
