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

      // setIdeas(JSON.parse(response.data.ideas));
      // setLastQuery(response.data.query);
      // console.log(response.data);
      setIdeas([
        {ideaTitle: "Local History Interactive Tours App", ideaScore: 2, ideaExplanation: "This app offers users engaging, location-based historical content. It aligns well with the mobile app concept, has strong potential to enhance local tourism, and is feasible with existing GIS technology."},       
        {ideaTitle: "Virtual Fitness Challenge Tracker", ideaScore: 3, ideaExplanation: "Users can join fitness challenges, track progress, and share results. It caters to the current fitness trend, is impactful by promoting health, and is relatively easy to develop using standard app features."},      
        {ideaTitle: "Daily Mood Tracker with Journaling", ideaScore: 4, ideaExplanation: "A simple app for users to log their moods daily. Although it promotes mental wellness, it’s less innovative and could face competition, impacting its uniqueness and potential."}
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
      {/* <h1 className="navbar">Idea Suggestion Chatbot</h1> */}

      <div className="content">
        {ideas.length > 0 && (
          <div className="ideas-container">
            <p className="instruction">
              Select any two ideas of your choice to get a detailed explanation:
            </p>
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
