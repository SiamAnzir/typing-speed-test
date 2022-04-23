import './App.css';
import {useState,useEffect,useRef} from "react";
import randomWords from "random-words";
import Navbar from "./components/Navbar";

const App = () => {
  const time = 60;

  const [words,setWords] = useState([]);
  const [count,setCount] = useState(time);
  const [currentValue, setCurrentValue] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentChar, setCurrentChar] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(-1);
  const [correctWord, setCorrectWord] = useState(0)
  const [incorrectWord, setIncorrectWord] = useState(0)
  const [status,setStatus] = useState("watching");
  const textInput = useRef(null);

  useEffect(() =>{
    setWords(createWords);
  },[]);

  useEffect(() => {
    if(status === "started"){
      textInput.current.focus()
    }
  },[status]);

  const createWords = () => {
    return new Array(250).fill(null).map(() => randomWords())
  }
  const countDownStart = () => {
    if(status === "finished"){
      setWords(createWords());
      setCurrentWordIndex(0);
      setCorrectWord(0);
      setIncorrectWord(0);
      setCurrentCharIndex(-1);
      setCurrentChar("");
    }
    if(status !== "started"){
      setStatus("started");
      let interval = setInterval(() => {
        setCount((prevCount) => {
          if(prevCount === 0){
            clearInterval(interval);
            setStatus("finished");
            setCurrentValue("")
            return time;
          }
          else{
            return prevCount - 1;
          }
        })
      },1000)
    }
  }
  const handleKeyUpdate = ({key, keyCode}) => {
    if(keyCode === 32){
      checkWord();
      setCurrentValue("");
      setCurrentWordIndex(currentWordIndex + 1);
      setCurrentCharIndex(-1);
    }
    else if (keyCode === 8) {
      setCurrentCharIndex(currentCharIndex - 1);
      setCurrentChar("");
    } else {
      setCurrentCharIndex(currentCharIndex + 1);
      setCurrentChar(key);
    }
  }
  const checkWord = () => {
    if(words[currentWordIndex] === currentValue.trim()){
      setCorrectWord(correctWord + 1);
    }
    else{
      setIncorrectWord(incorrectWord + 1);
    }
  }
  const setCharClass = (wordIndex,charIndex,char) => {
    if(wordIndex === currentWordIndex && charIndex === currentCharIndex && currentChar && status !== 'finished'){
      return (char === currentChar) ? (
          "correct-word"
      ) : (
          "incorrect-word"
      )
    }
    else if(wordIndex === currentWordIndex && currentCharIndex >= words[currentWordIndex].length){
      return "incorrect-word";
    }
    else{
      return "";
    }
  }
  return (
    <section className="App">
      <Navbar/>
      <div>
        <div className="text-box">
          <div className="header-row">
            <div className="header-column">
              <p className="counter">
                {(count < 10) ? ( "00:0"+count ) : ("00:"+count)}
              </p>
            </div>
            <div className="header-column">
              <input className="input-field" ref={textInput} disabled={status !== "started"} type="text" onKeyDown={handleKeyUpdate} value={currentValue} onChange={(e) => setCurrentValue(e.target.value)}/>
            </div>
            <div className="header-column">
              <button className="start-button" onClick={countDownStart}>
                {
                  (status === "finished") ? (
                      "Restart"
                  ) : (
                      "Start"
                  )
                }
              </button>
            </div>
          </div>
          <div className="row">
            {words.map((word,index) => (
                <span key={index}>
                <span>
                  {word.split("").map((char,i) => (
                      <span className={setCharClass(index,i,char)} key={i}>{char}</span>
                  ))}
                </span>
                <span> </span>
              </span>
            ))}
          </div>
        </div>
        <div className="result-box">
          <h4>Current Result</h4>
          <div className="row">
            <div className="column">
              <h4>Correct Words</h4>
              <h5>{correctWord}</h5>
            </div>
            <div className="column">
              <h4>InCorrect Words</h4>
              <h5>{incorrectWord}</h5>
            </div>
          </div>
          <div className="row">
            <div className="column">
              <h4>WPM</h4>
              <h5>{ Math.floor((correctWord +incorrectWord))}</h5>
            </div>
            <div className="column">
              <h4>Accuracy</h4>
              <h5>
                {(correctWord !== 0 ? (
                    Math.round((correctWord / (correctWord + incorrectWord)) * 100) + "%"
                ) : (
                    "0%"
                ))}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
