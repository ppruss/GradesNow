const fs = require("fs");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults();
const jwt = require("jsonwebtoken");
const database = JSON.parse(fs.readFileSync("./db.json", "UTF-8"));

server.use(middlewares);
server.use(jsonServer.bodyParser);

// TODO: move to secure location
const SECRET_KEY = "123456789";
const expiresIn = "1h";

// Authentication
// All other requests are handled by the default json-server endpoints
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

// Middleware to check for json token
// on all paths except the login
server.use(/^(?!\/login).*$/, (req, res, next) => {
  if (!req.header("x-auth-token")) {
    const status = 401;
    const message = "Bad authorization header";
    res.status(status).json({ status, message });
    return;
  }
  try {
    jwt.verify(req.header("x-auth-token"), SECRET_KEY);
    next();
  } catch (err) {
    const status = 401;
    const message = "Error: access_token is not valid";
    res.status(status).json({ status, message });
  }
});

// Dummy to check for the token
// TODO: return user matching the token
server.post("/authenticate", (req, res) => {
  res.status(200).json({ login: "success" });
});

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
