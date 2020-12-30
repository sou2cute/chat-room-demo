# chat-room-example

## Quick Start

Build images and run them.
* `cd chat-room-server`
* `docker build -t sample-server`
* `docker run -it -p 8080:8080 --name sample-server sample-server`  

Open another terminal at the directory of chat-room-ui.
* `docker build -t sample-client`
* `docker run -it -p 3000:80 --name sample-client sample-client`

## Note
Check the ip your docker located with `docker-machine ip`.  
If that ip differed from 192.168.99.100, you have to change the code in client.

## Reference
[https://youtu.be/hiiaHyhhwBU]
[https://github.com/gorilla/websocket/tree/master/examples/chat]
