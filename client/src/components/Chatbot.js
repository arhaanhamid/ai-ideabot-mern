import React, { useState } from "react";
import axios from "axios";
import IdeaList from "./IdeaList";

const Chatbot = () => {
  const [query, setQuery] = useState("");
  const [ideas, setIdeas] = useState([]);
  const [selected, setSelected] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post("http://localhost:4000/api/ideas", {
      //   query,
      // });

      // setIdeas(response.data);
      setIdeas([
        "1. Mood-based Playlist Generator:",
        "2. Skill Swap Marketplace:",
        "3. Instant Recipe Wizard:",
      ]);
    } catch (error) {
      console.error("Error fetching ideas:", error);
    }
  };

  const handleSelection = (e) => {
    const selectedNumbers = e.target.value
      .split(",")
      .map((num) => parseInt(num.trim()));
    setSelected(selectedNumbers);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Get Ideas</button>
      </form>

      {ideas.length > 0 && (
        <>
          <IdeaList ideas={ideas} />
          <input
            type="text"
            placeholder="Choose 2 ideas (e.g., 1, 3)"
            onChange={handleSelection}
          />
          <button onClick={() => alert(`Selected ideas: ${selected}`)}>
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default Chatbot;
