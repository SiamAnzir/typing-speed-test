import './App.css';
import {useState,useEffect} from "react";
import randomWords from "random-words";
import randomSentence from "random-sentence";

const words = randomWords(100).join(' ');

const App = () => {
  const [sentence,setSentence] = useState([]);
  useEffect(() =>{
    setSentence(words)
  },[]);
  console.log(sentence);
  return (
    <div className="App">
        <p> {sentence} </p>
    </div>
  );
}

export default App;
