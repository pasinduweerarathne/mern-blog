import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

export const fileRemover = (filename) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  fs.unlink(path.join(__dirname, "../uploads", filename), function (err) {
    if (err && err.code == "ENOENT") {
      // file dosn't exists
      console.log(`file ${filename} dosn't exist, won't remove it.`);
    } else if (err) {
      console.log(
        `Error occured while trying to remove file ${filename} ${err.message}`
      );
    } else {
      console.log(`removed filename ${filename}`);
    }
  });
};
