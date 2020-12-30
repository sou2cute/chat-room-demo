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

## References
Building a Live Chat App with React Tutorial [1]  
Gorilla Websocket Chat Example [2]

[1]: https://youtu.be/hiiaHyhhwBU  
[2]: https://github.com/gorilla/websocket/tree/master/examples/chat
