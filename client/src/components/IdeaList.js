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
            chosenIdeas.includes(idea) ? "selected" : ""
          }`}
          onClick={() => handleIdeaClick(idea)}
        >
          {idea}
        </div>
      ))}
    </div>
  );
};

export default IdeaList;
