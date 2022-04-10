import './App.css';
import {useState,useEffect,useRef} from "react";
import randomWords from "random-words";

const App = () => {
  const time = 10;

  const [words,setWords] = useState([]);
  const [count,setCount] = useState(time);
  const [currentValue, setCurrentValue] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
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
    }
    else{
      setIncorrectWord(incorrectWord + 1);
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
        <input ref={textInput} disabled={status !== "started"} type="text" onKeyDown={handleKeyUpdate} value={currentValue} onChange={(e) => setCurrentValue(e.target.value)}/>
      </div>
      <div>
        <button className="primary" onClick={countDownStart}>
          {
            (status === "finished") ? (
                "Restart"
            ) : (
                "Start"
            )
          }
        </button>
      </div>
      <div>
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
          <div>
            <h4>Correct Words</h4>
            <h5>{correctWord}</h5>
          </div>
          <div>
            <h4>InCorrect Words</h4>
            <h5>{incorrectWord}</h5>
          </div>
          <div>
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
  );
}

export default App;
