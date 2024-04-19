import { useState, useEffect } from 'react';
import * as toxicityClassifier from '@tensorflow-models/toxicity';

import './App.css';
import { UserText } from "./components/UserText";
import ListGroup from './components/ListGroup';

function App() {
  const [comments, setComments] = useState([]);
  const [model, setModel] = useState(null);

  useEffect(() => {
    async function loadModel() {
      const threshold = 0.6;
      const toxicityModel = await toxicityClassifier.load(threshold);
      setModel(toxicityModel);
    }
    if (model === null) {
      loadModel();
    }
  }, [comments]);

  const videoId = async (event) => {
    console.log(event)
    const response = await fetch(
      "http://localhost:3010/comments?videoId="+event.target.value
    ).then((response) => response.json());
    
    setComments(response.data.map((item)=>item.snippet.topLevelComment.snippet.textOriginal));
  };
  
  return (
    <>
        <div align = "center">
          <h1 className="title">MODERATOR APP</h1>
          <UserText videoId={videoId}></UserText>
        </div>
        <ListGroup comments={comments} model={model}></ListGroup>
    </>

  );
}

export default App;
