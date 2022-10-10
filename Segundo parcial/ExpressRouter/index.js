const express = require("express");
const cors = require("cors");
const { getUsers, postUser } = require("./routes/users");
const { checkToken } = require("./middlewares/users");

const port = process.env.PORT || 3000;

const app = express();
const router = express.Router();
app.use(cors({ origin: "*" }));

router.get("/users", getUsers);
router.post("/users", checkToken, postUser)

app.use(router);
app.listen(port);
