// const fs = require("fs");
// const { Transform } = require("stream");

// const readableStream = fs.createReadStream("./info");
// const myTransformStream = new Transform({
//   transform(chunk, encoding, callback) {
//     // Modify the data chunk (e.g., uppercase it)
//     const modifiedChunk = chunk.toString().toUpperCase();
//     this.push(modifiedChunk);
//     callback();
//   },
// });
// const writableStream = fs.createWriteStream("./output.txt");

// // readableStream.pipe(writableStream);
// readableStream.pipe(myTransformStream).pipe(writableStream);
