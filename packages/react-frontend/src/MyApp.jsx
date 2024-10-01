// src/MyApp.jsx
import React from "react";
import Table from "./Table";


function MyApp(){
  
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    <div className="container">
    <Table
      characterData={characters}
      removeCharacter={removeOneCharacter}
    />
  </div>
  }

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form />
    </div>
  );
}

export default MyApp;