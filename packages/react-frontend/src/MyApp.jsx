import React, { useState, useEffect } from 'react';
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);


  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);


  function fetchUsers() {
    return fetch("http://localhost:8000/users");
  }


  function deleteUser(id) {
    return fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    });
  }


  function removeOneCharacter(index) {
    const characterToDelete = characters[index];
    
    deleteUser(characterToDelete.id)
      .then((response) => {
        if (response.status === 204) {
          const updated = characters.filter((character, i) => i !== index);
          setCharacters(updated); l
        } else {
          console.error("Failed to delete user. Status code:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  }

 
  function postUser(person) {
    return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
  }


  function updateList(person) {
    postUser(person)
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error("User creation failed. Status code: " + response.status);
        }
      })
      .then((newUser) => {
        setCharacters([...characters, newUser]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
