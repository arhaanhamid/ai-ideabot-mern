import React, { useState } from "react";

const IdeaList = ({ ideas, chosenIdeas, setChosenIdeas }) => {
  const handleIdeaClick = (idea) => {
    if (chosenIdeas.includes(idea)) {
      // Remove the idea if it's already chosenIdeas
      setChosenIdeas(chosenIdeas.filter((item) => item !== idea));
    } else if (chosenIdeas.length < 2) {
      // Add the idea if less than 2 are chosenIdeas
      const newSelections = [...chosenIdeas, idea];
      setChosenIdeas(newSelections);
    }
  };

  return (
    <div className="choices-container">
      {ideas.map((idea, index) => (
        <div
          key={index}
          className={`ideas-div ${
            chosenIdeas.includes(idea.ideaTitle) ? "selected" : ""
          }`}
          onClick={() => handleIdeaClick(idea.ideaTitle)}
        >
          {idea.ideaTitle}
          <div className="ask-explain" style={{ display: chosenIdeas.includes(idea.ideaTitle) ? "block" : "none" }}
          >Why this score?</div>
          <div className="ideas-score">{idea.ideaScore}</div>
        </div>
      ))}
    </div>
  );
};

export default IdeaList;
