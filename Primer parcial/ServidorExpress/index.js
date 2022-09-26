const express = require("express");
const cors = require("cors");
const { checkId } = require("./middlewares/index");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const pasarAMayusculas = require("./custom_modules");

const whitelist = ["http://localhost:8081"];

const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error(`${origin} no permitido`));
    }
  },
};

const app = express();
const logStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

app.use(express.json());
app.use(express.text());
app.use(cors(options));
// app.use(printHelloWorld); Mi middleware desde 0 para peticiones al API
app.use(morgan("combined", { stream: logStream }));

app.use(
  "/",
  express.static("public", {
    dotfiles: "ignore",
  })
);

app.get("/users/:id", checkId, (req, res) => {
  const { id } = req.params;
  res.status(202).json({ message: "Okay", id });
});

app.get("/file", (req, res) => {
  res.status(200).sendFile(
    `./data/imagen.png`,
    {
      root: __dirname,
    },
    (err) => {
      if (err) {
        res.status(404).send({ message: "Error", desc: "File not found" });
      }
    }
  );
});

app.post("/subirArchivo/:filename", (req, res) => {
  const { filename } = req.params;
  const { text } = req.body;
  const { id } = req.query;
  if (!filename || !text)
    res
      .status(400)
      .json({ message: pasarAMayusculas("Filename and text are required") });
  res
    .status(200)
    .json({
      message: "Successfully added",
      params: { filename: pasarAMayusculas(filename), text, id },
    });
});

app.post("/subirArchivo", (req, res) => {
  const { extension } = req.query;
  console.log(extension);
  res.status(200).json({
    message: "Your text has been uploaded",
    confirmedExtension: extension,
    confirmedText: req.body,
  });
});

app.listen(3000, console.log("Corriendo en el port 3000"));
