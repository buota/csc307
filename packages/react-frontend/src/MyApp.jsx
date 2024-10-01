// src/MyApp.jsx
import React from "react";
import Table from "./Table";


function MyApp() {
  const characters = [
    {
      name: "Charlie",
      job: "Janitor"
    },
    {
      name: "Mac",
      job: "Bouncer"
    },
    {
      name: "Dee",
      job: "Aspring actress"
    },
    {
      name: "Dennis",
      job: "Bartender"
    }
  ];
  function removeOneCharacter(index) {
    <div className="container">
    <Table
      characterData={characters}
      removeCharacter={removeOneCharacter}
    />
  </div>
  }
}

export default MyApp;