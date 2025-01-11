import React from "react";

const IdeaList = ({ ideas }) => (
  <div>
    <h3>Generated Ideas:</h3>
    <ul>
      {ideas.map((idea, index) => (
        <li key={index}>
          {index + 1}. {idea}
        </li>
      ))}
    </ul>
  </div>
);

export default IdeaList;
