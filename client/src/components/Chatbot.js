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
  const [loading, setLoading] = useState([false, false]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Query:", query);
    const button = e.currentTarget.querySelector("button[type='submit']");
    button.disabled = true;
    button.classList.add("disabled");
    setLoading([true, false])
    try {
      const response = await axios.post("http://localhost:4000/api/ideas", {
        query,
      });
      setLoading([false, false])
      button.disabled = false;
      button.classList.remove("disabled");
      
      console.log("Response:", response);
      setIdeas(JSON.parse(response.data.ideas));
      setLastQuery(response.data.query);
    } catch (error) {
      console.error("Error fetching ideas:", error);
    }
  };

  const handleExplain = async (e) => {
    e.preventDefault();
    const button = e.target;
    button.disabled = true;
    button.classList.add("disabled");
    setLoading([false, true])
    try {
      const response = await axios.post(
        "http://localhost:4000/api/ideas/explain",
        {
          chosenIdeas,
          lastQuery,
        }
      );
      setLoading([false, false])
      button.disabled = false;
      button.classList.remove("disabled");
      setExplainedIdeas(response.data);      
    } catch (error) {
      console.error("Error fetching ideas:", error);
    }
  };

  return (
    <div className="container">
      <div className="content">
        <div style={{display: ideas.length === 0 ? "flex" : "none", alignItems: "center", justifyContent: "center", height: "100%"}}>
          <h1 className="title">Hello friend, tell me your deepest and darkest thought!</h1>
        </div>
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
            
            <div>
              <button className="explain-btn" onClick={handleExplain}>{loading[1] === true ? "Loading..." : "Get explanation"}</button>
            </div>
          </div>
        )}

        {explainedIdeas !== "" && (
          <div className="ideas-explained">

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
        {loading[0] === true ? "Loading..." : "Search"}
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
