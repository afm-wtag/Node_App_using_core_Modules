import { createServer } from "http";
const PORT = process.env.PORT || 3000;
const users = [
  { id: 1, name: "Afnan Mumu" },
  { id: 2, name: "John Doe" },
  { id: 3, name: "Jim Doe" },
];
// Logger Middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
//JSON middleware
const jsonMiddleware = (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
};
// Route hanfler for GET /api/users
const getUsersHandler = (req, res) => {
  res.write(JSON.stringify(users));
  res.end();
};
// Route hanfler for GET /api/users/:id
const getUserByIdHandler = (req, res) => {
  const id = req.url.split("/")[3];
  const user = users.find((usr) => usr.id === parseInt(id));
  if (user) {
    res.write(JSON.stringify(user));
  } else {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: "User Not Found" }));
  }
  res.end();
};
// Route hanfler for POST /api/users
const createUserHandler = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const newUser = JSON.parse(body); // json to JS object
    users.push(newUser); // insert in database
    res.statusCode = 201; // success and something was created
    res.write(JSON.stringify(newUser)); // JS object to json
    res.end();
  });
};
// NOT found hanfler
const notFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.write(JSON.stringify({ message: "Route Not Found" }));
  res.end();
};

const server = createServer((req, res) => {
  logger(req, res, () => {
    jsonMiddleware(req, res, () => {
      if (req.url === "/api/users" && req.method === "GET") {
        getUsersHandler(req, res);
      } else if (
        req.url.match(/\/api\/users\/([0-9]+)/) &&
        req.method === "GET"
      ) {
        getUserByIdHandler(req, res);
      } else if (req.url === "/api/users" && req.method === "POST") {
        createUserHandler(req, res);
      } else {
        notFoundHandler(req, res);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server Running on Port: ${PORT}`);
});
