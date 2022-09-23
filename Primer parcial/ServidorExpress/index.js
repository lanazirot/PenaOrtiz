const express = require("express");
const cors = require("cors");
const { printHelloWorld, checkId } = require("./middlewares/index");

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
app.use(express.json());
app.use(express.text());
app.use(cors(options));
app.use(printHelloWorld);

// const router = express.Router()
// app.use(router)

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

app.post("/subirArchivo", (req, res) => {
  const { extension } = req.query;
  res.status(200).json({
    message: "Your text has been uploaded",
    confirmedExtension: extension,
    confirmedText: req.body,
  });
});

app.post("/subirArchivo/:filename", (req, res) => {
  const { filename } = req.params;
  const { text } = req.body;
  const { id } = req.query;
  if (!filename || !text)
    res.status(400).json({ message: "Filename and text are required" });
  res
    .status(200)
    .json({ message: "Successfully added", params: { filename, text, id } });
});

app.use("*", (req, res) => {
  res.redirect("404.html");
});

app.listen(3000, console.log("Corriendo en el port 3000"));
