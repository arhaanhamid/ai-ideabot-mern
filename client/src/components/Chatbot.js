import React, { useState } from "react";
import axios from "axios";
import IdeaList from "./IdeaList";
import ReactMarkdown from "react-markdown";

const md = `### Local History Interactive Tours App

#### Overview

A "Local History Interactive Tours App" is a mobile application designed to enhance users' understanding and appreciation of the history of their immediate surroundings through interactive guided tours. This app aims to make local history accessible and engaging, utilizing technology to provide an enriched learning experience. The app can benefit tourists looking for enriching experiences and locals wanting to explore the historical significance of their hometown.

#### Key Features

1. **Geolocation and Mapping:**
   - The app uses GPS technology to identify the user’s location and guide them along historical routes.
   - Interactive maps can display points of interest (POIs) related to local history, including monuments, buildings, plaques, and historical sites.
   - Users can choose different paths based on their interests (e.g. architecture, significant events, local legends).

2. **Audio Guides:**
   - Each point of interest features audio narration that tells the story behind it, possibly narrated by local historians or actors.
   - Users can listen as they walk, enhancing the experience by allowing them to absorb information while being physically present at the site.

3. **Augmented Reality (AR):**
   - By using AR, users can point their mobile device at a historical site to see a visual overlay that shows how it looked at a specific point in time.
   - Historical images or animations can be integrated that visually illustrate significant events that took place at that location, providing a narrative that connects past and present.

4. **Interactive Content:**
   - The app can include quizzes, trivia, and challenges related to local history, making the learning process fun and engaging.
   - Users could earn badges or rewards for completing specific tours or quizzes, promoting gamification.

5. **User-Generated Content:**
   - Users can contribute their own findings, stories, photos, or historical anecdotes, further enriching the data available on local history.
   - A community feature may allow users to discuss and share insights and plans for group tours, creating a sense of community around local heritage.

6. **Customizable Tours:**
   - Individuals can create personal tours based on their interests, including specific themes such as "Civil Rights Movement" or "Architectural Marvels."
   - Pre-set tours can be made available, curated by historians or cultural organizations.

7. **Accessibility Features:**
   - The app should cater to a range of users, including those with disabilities, ensuring that the content and navigational features are accessible.
   - Options for visual impairment (like voice-over narration) or easy-to-read text can be incorporated.

#### Context and Benefits

1. **Educational Value:**
   - The app promotes civic education by informing users about their local history. Understanding local heritage fosters a sense of belonging and identity among community members.
   - It can serve as a valuable educational tool for schools, offering students hands-on learning opportunities outside the classroom.

2. **Tourism Enhancement:**
   - The app can enhance the experience of visitors, as it offers an engaging method to explore a city beyond traditional tourist traps. This can potentially increase foot traffic to less-visited historical sites, benefiting local economies and small businesses.

3. **Cultural Preservation:**
   - By documenting stories and histories that may otherwise be lost, the app promotes the preservation of local narrative and cultural heritage.
   - It may encourage local governments and organizations to take action in protecting historical sites.

4. **Community Engagement:**
   - Leveraging local historians or community leaders in the development of content can foster stronger ties within the community.
   - Events or group tours organized through the app can encourage social interaction and community building.

5. **Environmental Consideration:**
   - With a mobile app, users can choose walking or biking tours over driving, which promotes eco-friendly tourism practices.
   - Users are more likely to appreciate their environment sustainably, ultimately encouraging preservation efforts.

#### Challenges and Considerations

1. **Content Accuracy:**
   - The reliability and accuracy of the historical information provided require constant updates and oversight by qualified historians.
   - Establishing partnerships with local history experts can ensure that content is factual, engaging, and relevant.

2. **Technology Barriers:**
   - Not all potential users may have access to smartphones or mobile internet, which can limit reach. Implementing offline capabilities or providing data usage alternatives can mitigate this.

3. **User Engagement:**
   - Sustaining user interest over time may be challenging; regular updates, seasonal events, or new tours can keep the app content fresh and engaging.

4. **Cultural Sensitivity:**
   - Handling local histories, particularly those tied to marginalized communities, requires a sensitive and respectful approach.
   - Collaboration with local communities is crucial to ensure diverse narratives are shared and represented accurately.

#### Conclusion

A "Local History Interactive Tours App" not only fulfills a need for accessible, engaging educational resources but also serves as a bridge between people and the stories embedded in their surroundings. Through adaptive technology, such an app can build a more informed and connected community, fostering a deeper appreciation for the diverse histories that shape our world.`

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
      // const response = await axios.post(
      //   "http://localhost:4000/api/ideas/explain",
      //   {
      //     chosenIdeas,
      //     lastQuery,
      //   }
      // );
      // setExplainedIdeas(response.data);
      setExplainedIdeas(md);
      
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching ideas:", error);
    }
  };

  return (
    <div className="container">
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
            
            <div>
              <button className="explain-btn" onClick={handleExplain}>Get explanation</button>
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
          Get Ideas
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
