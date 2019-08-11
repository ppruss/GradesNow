const fs = require("fs");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults();
const jwt = require("jsonwebtoken");
const database = JSON.parse(fs.readFileSync("./db.json", "UTF-8"));

server.use(middlewares);
server.use(jsonServer.bodyParser);

const SECRET_KEY = "123456789";
const expiresIn = "1h";

server.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (
    database.users.findIndex(
      user => user.email === email && user.password === password
    ) < 0
  ) {
    const status = 401;
    const message = "Incorrect email or password";
    res.status(status).json({ status, message });
  } else {
    const token = jwt.sign({ email, password }, SECRET_KEY, { expiresIn });
    res.status(200).json({ token });
  }
});

// server.use(/^(?!\/login).*$/, (req, res, next) => {
//   if (!req.header("x-auth-token")) {
//     const status = 401;
//     const message = "Bad authorization header";
//     res.status(status).json({ status, message });
//     return;
//   }
//   try {
//     jwt.verify(req.header("x-auth-token"), SECRET_KEY);
//     next();
//   } catch (err) {
//     const status = 401;
//     const message = "Error: access_token is not valid";
//     res.status(status).json({ status, message });
//   }
// });

server.post("/authenticate", (req, res) => {
  //const valid = jwt.verify(req.headers.authorization.split(" ")[1]);
  res.status(200).json({ login: "success" });
});

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
