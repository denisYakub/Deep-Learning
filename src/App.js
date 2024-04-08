import "./App.css";
import { UserText } from "./components/UserText";
import { ModeratorNotifications } from "./components/ModeratorNotifications";

import { useState } from "react";
import { useEffect } from "react";

import * as tf from "@tensorflow-models/toxicity";

function App() {
  const [textToxicity, setTextToxicity] = useState([]);
  const [model, setModel] = useState(null);

  const predictToxicity = async (event) => {
    const predictions = await model.classify([event.target.value]);
    setTextToxicity(
      predictions
        .filter((item) => item.results[0].match === true)
        .map((item) => item.label)
    );
  };

  useEffect(() => {
    async function loadModel() {
      const threshold = 0.6;
      const toxicityModel = await tf.load(threshold);
      setModel(toxicityModel);
    }
    if (model === null) {
      loadModel();
    }
  }, [textToxicity, model]);

  return (
    <div>
      <h1 className="title">Start Typing ... </h1>
      <UserText predictToxicity={predictToxicity}></UserText>
      <ModeratorNotifications
        textToxicity={textToxicity}
      ></ModeratorNotifications>
    </div>
  );
}

export default App;
