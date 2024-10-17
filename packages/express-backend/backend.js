import express from "express";
import cors from "cors";
import userService from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
  const { name, job } = req.query;

  if (name && job) {
    userService.findUserByNameAndJob(name, job)
      .then((users) => {
        res.send({ users_list: users });
      })
      .catch((error) => {
        res.status(500).send(error.message);
      });
  } else {
    userService.getUsers(name, job)
      .then((users) => {
        res.send({ users_list: users });
      })
      .catch((error) => {
        res.status(500).send(error.message);
      });
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;

  userService.addUser(userToAdd)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];

  userService.findUserById(id)
    .then((user) => {
      if (!user) {
        res.status(404).send("User not found.");
      } else {
        res.send(user);
      }
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];

  userService.findUserByIdAndDelete(id)
    .then((deletedUser) => {
      if (!deletedUser) {
        res.status(404).send("User not found.");
      } else {
        res.status(204).send(); 
      }
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
