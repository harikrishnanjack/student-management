const jsonServer = require("json-server");
const server = jsonServer.create();
const jwt = require("jsonwebtoken");
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);
const SECRET_KEY = "your-secret-key";
server.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = router.db.get("users").find({ username, password }).value();

  if (user) {
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ token: token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
