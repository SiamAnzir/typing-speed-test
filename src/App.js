import './App.css';
import {useState,useEffect} from "react";
import randomWords from "random-words";
//import randomSentence from "random-sentence";


const App = () => {
  const [words,setWords] = useState([]);
  const [count,setCount] = useState(10);
  const [currentValue, setCurrentValue] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [correctWord, setCorrectWord] = useState(0)
  const [incorrectWord, setIncorrectWord] = useState(0)

  useEffect(() =>{
    setWords(createWords);
  },[]);

  const createWords = () => {
    return new Array(250).fill(null).map(() => randomWords())
  }
  const countDownStart = () => {
    let interval = setInterval(() => {
      setCount((prevCount) => {
        if(prevCount === 0){
          clearInterval(interval);
        }
        else{
          return prevCount - 1;
        }
      })
    },1000)
  }
  const handleKeyUpdate = ({keyCode}) => {
    if(keyCode === 32){
      checkWord();
      setCurrentValue("");
      setCurrentWordIndex(currentWordIndex + 1);
    }
  }
  const checkWord = () => {
    if(words[currentWordIndex] === currentValue.trim()){
      setCorrectWord(correctWord + 1);
      console.log(correctWord);
    }
    else{
      setIncorrectWord(incorrectWord + 1);
      console.log(correctWord);
    }
  }
  //const words = randomWords(100).join(' ');
  //console.log(words.join(' '));
  return (
    <div className="App">
      <div>
        <h3>{count}</h3>
      </div>
      <div>
        <input type="text" onKeyDown={handleKeyUpdate} value={currentValue} onChange={(e) => setCurrentValue(e.target.value)}/>
      </div>
      <div>
        <button className="primary" onClick={countDownStart}>
          Start
        </button>
      </div>
      <div>
        {words.map((word,index) => (
            <span key={index}>
                <span>
                  {word.split("").map((char,i) => (
                      <span key={i}>{char}</span>
                  ))}
                </span>
                <span> </span>
              </span>
        ))}
      </div>
      <div>
        <h4>Correct Words</h4>
        <h5>{correctWord}</h5>
      </div>
      <div>
        <h4>Accuracy</h4>
        <h5>{Math.round((correctWord / (correctWord + incorrectWord)) * 100)}%</h5>
      </div>
    </div>
  );
}

export default App;
