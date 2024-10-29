import { RPCClient } from "ocpp-rpc";

const cli = new RPCClient({
  endpoint: "ws://localhost:3000",
  identity: "XYZ123",
});

await cli.connect();

const bootResponse = await cli.call("BootNotification", {
  chargePointVendor: "ocpp-rpc",
  chargePointModel: "ocpp-rpc",
});

if (bootResponse.status === "Accepted") {
  const heartbeatResponse = await cli.call("Heartbeat", {});
  console.log("Server time is:", heartbeatResponse.currentTime);
  await cli.call("StatusNotification", {
    connectorId: 0,
    errorCode: "NoError",
    status: "Available",
  });
}
