# OCPP-RPC Fastify

Usage example of [ocpp-rpc](https://github.com/mikuso/ocpp-rpc) module with Fastify.

## Installation

Install project dependencies.

```bash
npm install
```

## Usage

Server example (`server.js`). Start the RPC Server to listen on defined port (e.g. 3000)

```bash
npm run server
```

Client example (`client.js`). Start a client connection as RPC Client to defined server with configured port. On connection sends a `BootNotification` message to server.

```
npm run client
```

RPC client and server code obtained from `ocpp-rpc` examples.