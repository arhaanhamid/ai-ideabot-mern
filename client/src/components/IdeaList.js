import React, { useState } from "react";

const IdeaList = ({ ideas, chosenIdeas, setChosenIdeas }) => {
  const [selectedIdeas, setSelectedIdeas] = useState([]);

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
  const handleReasonClick = (index) => {
    if (selectedIdeas.includes(index)) {
      setSelectedIdeas(selectedIdeas.filter((item) => item !== index));
    } else  {
      const newSelections = [...selectedIdeas, index];
      setSelectedIdeas(newSelections);
    }
  };

  console.log(chosenIdeas);
  console.log(selectedIdeas);
  return (
    <div className="choices-container">
      {ideas.map((idea, index) => (
        <div
          key={index}
          className={`ideas-div ${
            chosenIdeas.includes(idea.ideaTitle) || selectedIdeas.includes(index) ? "selected" : ""
          }`}
          onClick={() => handleIdeaClick(idea.ideaTitle)}
        >
          {selectedIdeas.includes(index) ? idea.ideaExplanation : idea.ideaTitle}
          <div
            key={index}
            className="ideas-reason"
            style={{ display: chosenIdeas.includes(idea.ideaTitle) || selectedIdeas.includes(index) ? "block" : "none",
              
             }}
            onClick={() => handleReasonClick(index)}
          ><p>{selectedIdeas.includes(index) ? "Show Idea" : "Why this score?"}</p></div>
          <div className="ideas-score">{idea.ideaScore}</div>
        </div>
      ))}
    </div>
  );
};

export default IdeaList;
