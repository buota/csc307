import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspiring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

// Function to generate a random unique ID
const generateRandomId = () => {
  return Math.random().toString(36).substr(2, 9); // Generates a 9-character alphanumeric ID
};

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserById = (id) => 
  users["users_list"].find((user) => user["id"] === id);


const addUser = (user) => {
  user.id = generateRandomId(); 
  users["users_list"].push(user);
  return user;
};

const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

app.use(cors());
app.use(express.json());


app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name !== undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});


app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const newUser = addUser(userToAdd); 
  res.status(201).json(newUser);
});


app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; 
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  const userIndex = users["users_list"].findIndex((user) => user["id"] === id);
  
  if (userIndex === -1) {
    return res.status(404).send("User not found.");
  }
  
  users["users_list"].splice(userIndex, 1);
  res.status(204).send(); 
});


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
