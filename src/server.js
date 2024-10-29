import Fastify from "fastify";
import { RPCServer } from "ocpp-rpc";

const fastify = Fastify({
  logger: true,
});

const server = new RPCServer({
  protocols: ["ocpp1.6"],
  strictMode: true,
});

server.auth((accept, reject, handshake) => {
  accept({
    sessionId: "XYZ123",
  });
});

server.on("client", (client) => {
  console.log(`${client.session.sessionId} connected!`); // `XYZ123 connected!`

  client.handle("BootNotification", ({ params }) => {
    console.log(`Server got BootNotification from ${client.identity}:`, params);
    return {
      status: "Accepted",
      interval: 300,
      currentTime: new Date().toISOString(),
    };
  });

  client.handle("Heartbeat", ({ params }) => {
    console.log(`Server got Heartbeat from ${client.identity}:`, params);
    return {
      currentTime: new Date().toISOString(),
    };
  });

  client.handle("StatusNotification", ({ params }) => {
    console.log(
      `Server got StatusNotification from ${client.identity}:`,
      params
    );
    return {};
  });

  client.handle(({ method, params }) => {
    console.log(`Server got ${method} from ${client.identity}:`, params);
    throw createRPCError("NotImplemented");
  });
});

fastify.ready(() => {
  fastify.server.on("upgrade", server.handleUpgrade);
});

try {
  await fastify.listen({ port: 3000, host: "0.0.0.0" });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
