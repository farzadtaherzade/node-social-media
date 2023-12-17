const fs = require("fs");
const path = require("path");

const deleteFile = (filename) => {
  if (filename) {
    const filepath = path.join(process.cwd(), "public", "uploads", filename);
    if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
  }
};

module.exports = {
  deleteFile,
};
