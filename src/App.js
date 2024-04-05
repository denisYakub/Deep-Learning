import logo from './logo.svg';
import './App.css';
import * as tf from '@tensorflow-models/toxicity';
import {useEffect, useState} from 'react';

function App() {

  const [model, setModel] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    async function loadModel(){
      const threshold = 0.6;
      const toxicityModel = tf.load(threshold);
      setModel(toxicityModel);
    }
    if(model === null){
      loadModel();
    }
  }, [model, text])
  
  const prediction = async () => {
    console.log("Word:", text);

    const predictions = (await model).classify([text]);
    //predictions
        //.filter((item) => item.results[0].match === true)
        //.map((item) => item.label)
    
    console.log("Prediction:", predictions);
  }

  return (
    <div className="App">
      <h1>Hi</h1>
      <input onChange={e => {setText(e.target.value)}}></input>
      <button onClick={prediction}>Submit</button>
    </div>
  );
}

export default App;
