import express from "express";
// import localIpUrl from "local-ip-url";
import cors from "cors";
import os from "os";

const app = express();
const port = 3000;
app.use(cors());

function getIPAddress() {
  const interfaces = os.networkInterfaces();
  let ipAddress = "Not found";

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Filter out internal interfaces and IPv6 addresses
      if (iface.family === "IPv4" && !iface.internal) {
        ipAddress = iface.address;
        break;
      }
    }
  }

  return ipAddress;
}

app.use("/", (req, resp) => {
  return resp.status(200).json({ success: true, ip: getIPAddress() });
});

app.listen(port, (req, resp) => {
  console.log(`server running on ${port} port`);
});
