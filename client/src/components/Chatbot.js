import React, { useState } from "react";
import axios from "axios";
import IdeaList from "./IdeaList";
import ReactMarkdown from "react-markdown";

const Chatbot = () => {
  const [query, setQuery] = useState("");
  const [lastQuery, setLastQuery] = useState("");
  const [ideas, setIdeas] = useState([]);
  const [chosenIdeas, setChosenIdeas] = useState([]);
  const [explainedIdeas, setExplainedIdeas] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post("http://localhost:4000/api/ideas", {
      //   query,
      // });

      // setIdeas(response.data.ideas);
      // setLastQuery(response.data.query);
      // console.log(response.data);
      setIdeas([
        "1. Virtual wardrobe organizer with AI outfit suggestions.  ",
        "2. Local volunteer opportunities matchmaking based on interests.  ",
        "3. Interactive wellness journal with daily mindfulness prompts.",
      ]);
      setLastQuery("mobile app");
    } catch (error) {
      console.error("Error fetching ideas:", error);
    }
  };

  const handleExplain = async (e) => {
    e.preventDefault();
    console.log(chosenIdeas);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/ideas/explain",
        {
          chosenIdeas,
          lastQuery,
        }
      );
      setExplainedIdeas(response.data);
      // setIdeas([
      //   "1. Mood-based Playlist Generator:",
      //   "2. Skill Swap Marketplace:",
      //   "3. Instant Recipe Wizard:",
      // ]);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching ideas:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="navbar">Idea Suggestion Chatbot</h1>

      <div className="content">
        {ideas.length > 0 && (
          <div className="ideas-container">
            <h1>
              Select any two ideas of your choice to get a detailed explanation:
            </h1>
            <IdeaList
              ideas={ideas}
              chosenIdeas={chosenIdeas}
              setChosenIdeas={setChosenIdeas}
            />
            <p className="instruction">
              Click on any two options to see the alert.
            </p>

            <button onClick={handleExplain}>Get explanation</button>
          </div>
        )}

        {explainedIdeas !== "" && (
          <div className="ideas-container">
            <ReactMarkdown>{explainedIdeas}</ReactMarkdown>
          </div>
        )}
      </div>

      <form className="form-container" onSubmit={handleSubmit}>
        <input
          type="text"
          id="input-box"
          placeholder="Enter your query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button id="submit-btn" type="submit">
          Get Ideas
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
