import socket
import sys
import client_pb2


def main():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind((str(sys.argv[1]), int(sys.argv[2])))
    server.listen(100)
    print("Esperando client...")
    conn, addr = server.accept()

    clientBinaryData = conn.recv(2048)
    client = client_pb2.Client.FromString(clientBinaryData)
    print("Lendo Objeto com python")
    print(client)

    conn.close()
    server.close()


if __name__ == "__main__":
    main()

# f = open("../bin/binary", "r")
# employeeBinaryData = f.read()
# employee = employees_pb2.Employee.FromString(employeeBinaryData)
# print("Lendo Objeto com python")
# print(employee)
