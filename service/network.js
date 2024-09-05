const os = require("os");

exports.getNetworkIpAddress = () => {
  const networkInterface = os.networkInterfaces();
  const connectedNetworkInterface = Object.values(networkInterface)
    .flatMap((int) => int)
    .find((iface) => iface.family === "IPv4");

  if (connectedNetworkInterface) {
    return connectedNetworkInterface.address;
  } else {
    return null;
  }
  
};
