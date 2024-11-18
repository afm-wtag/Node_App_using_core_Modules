// import fs from "fs";

// readFile() - callback
// fs.readFile("./test.txt", "utf8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// readFileSync() - Synchronous version(blocking)
// const data = fs.readFileSync("./test.txt", "utf8");
// console.log(data);

import fs from "fs/promises";
// readFile() - promises -> then()
// fs.readFile("./test.txt", "utf8")
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

// readFile() - promises -> async await
const readFile = async () => {
  try {
    const data = await fs.readFile("./test.txt", "utf8");
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
const writeFile = async () => {try {
  await fs.writeFile("./test.txt", "Hello overriden file");
  console.log('File written');
} catch (error) {
  console.log(error);
    }
}; writeFile();
const appendFile = async () => {
    try {
        await fs.appendFile('./test.txt','\nThis is appended text')
    } catch (error) {
        console.log(error)
    }
}
appendFile();
readFile();