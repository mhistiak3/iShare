const fs = require("fs");
const path = require("path");

function deleteUploadsFolder() {
  const folderPath = path.join(__dirname, "uploads");

  // Check if the "uploads" folder exists
  if (fs.existsSync(folderPath) && fs.lstatSync(folderPath).isDirectory()) {
    // Delete the folder and its contents
    fs.rmSync(folderPath, { recursive: true, force: true });
    console.log(`Deleted folder: ${folderPath}`);
  } else {
    console.log(`Folder '${folderPath}' does not exist, skipping deletion.`);
  }
}
module.exports = deleteUploadsFolder;
