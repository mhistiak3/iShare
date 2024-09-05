const express = require("express");
const router = require("./routes/router");
const { getNetworkIpAddress } = require("./service/network");
const { initIO } = require("./service/scoket");
const deleteUploadsFolder = require("./service/deleteUploadFolder");

// app
const app = express();
const port = 5050;

// Network IP Address
const ipAddress = getNetworkIpAddress()
console.log(ipAddress);


// Static Middleware Routes
app.use("/",express.static("./public"))
app.use("/uploads",express.static("./uploads"))

// Application Routes
app.use("/api/v1",router)

setInterval(deleteUploadsFolder, 3600 * 1000); // 1 hour in milliseconds
const server = app.listen(port, () => {
    if(!ipAddress){
        console.info("server Stopped")
        process.exit(0)
    }
  console.log(`Server start on port: ${port}`);
  console.info(`Server connection address for file sharing is http://${ipAddress}:${port}`)
});

// 
initIO(server)