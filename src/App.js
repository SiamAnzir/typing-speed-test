import './App.css';
import React, {useState,useEffect,useRef} from "react";
import randomWords from "random-words";
import useModal from "./hooks/useModal";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import useLocalStorage from "./hooks/useLocalStorage";

const App = () => {
  const time = 10;
  const accuracy = (correctWord,incorrectWord) => {
    return Math.round((correctWord / (correctWord + incorrectWord)) * 100)
  };
  const wpm = (correctWord,incorrectWord) => {
    return Math.floor((correctWord +incorrectWord))
  };

  const [words,setWords] = useState([]);
  const [count,setCount] = useState(time);
  const [currentValue, setCurrentValue] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentChar, setCurrentChar] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(-1);
  const [correctEntity,setCorrectEntity] = useState([]);
  const [correctWord, setCorrectWord] = useState(0);
  const [incorrectWord, setIncorrectWord] = useState(0);
  const [status,setStatus] = useState("watching");
  const [profile,setProfile] = useLocalStorage('name',"");
  const [numberOfTest,setNumberOfTest] = useLocalStorage('Game Played',0);
  const newTestResult = {
    correctWords:correctWord,
    inCorrectWords:incorrectWord,
    WPM:wpm(correctWord,incorrectWord),
    Accuracy:accuracy(correctWord,incorrectWord)
  }
  const correctEntry = {}
  const [info,setInfo] = useLocalStorage('userInfo',[]);
  const [currentResult,setCurrentResult] = useState(newTestResult);
  const [correctChar,setCorrectChar] = useLocalStorage('Correct-Char','');
  const textInput = useRef(null);
  const {isShowing, toggle} = useModal();

  useEffect(() =>{
    setWords(createWords);
  },[]);

  useEffect(() => {
    if(status === "started"){
      textInput.current.focus()
    }
  },[status]);

  useEffect(() => {
    if(status === "finished"){
      setInfo([...info,currentResult]);
      setCorrectChar(correctEntry);
    }
  },[status])

  const createWords = () => {
    return new Array(240).fill(null).map(() => randomWords())
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
            setCurrentValue("");
            setNumberOfTest(numberOfTest + 1);
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
      setCorrectEntity([...correctEntity,words[currentWordIndex]]);
      setCorrectWord(correctWord + 1);
      setCurrentResult({ correctWords:correctWord+1, inCorrectWords:incorrectWord, WPM:wpm(correctWord+1,incorrectWord), Accuracy:accuracy(correctWord+1,incorrectWord)});
    }
    else{
      setIncorrectWord(incorrectWord + 1);
      setCurrentResult({ correctWords:correctWord, inCorrectWords:incorrectWord+1, WPM:wpm(correctWord,incorrectWord+1), Accuracy:accuracy(correctWord,incorrectWord+1)});
    }
  }

  const charArray = correctEntity.map((word) => {
    return word.split('').reduce((total, letter) => {
      total[letter] ? total[letter]++ : total[letter] = 1;
      return total;
    }, correctEntry);
  })
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

  const modalHandleSubmit = () => {
    toggle();
    setProfile(profile);
  }
  const modalInputChange = (event) => {
    setProfile(event.target.value);
  }
  const totalCorrectWords = info.reduce((sum,result) => {
    sum += result.correctWords ;
    return sum;
  }, 0);
  const totalIncorrectWords = info.reduce((sum,result) => {
    sum += result.inCorrectWords ;
    return sum;
  }, 0);
  const sumOfWpm = info.reduce((sum,result) => {
    sum += result.WPM ;
    return sum;
  }, 0);
  const sumOfAccuracy = info.reduce((sum,result) => {
    sum += result.Accuracy ;
    return sum;
  }, 0);
  const averageWpm = (numberOfTest === 0) ? ( 0 ) : ( Math.round(sumOfWpm / numberOfTest));
  const averageAccuracy = (numberOfTest === 0) ? ( 0 ) : ( Math.round(sumOfAccuracy / numberOfTest))
  return (
    <section className="App">
      <Modal
          isShowing={isShowing}
          modalHandleSubmit={modalHandleSubmit}
          modalInputChange={modalInputChange}
          profileName={profile}
      />
      <Navbar profileName={profile}/>
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
          <div className="result-header">
            <h1>Current Result</h1>
          </div>
          <div className="row">
            <div className="column" style={{borderRight:'2px solid #003366'}}>
              <h4>Correct Words</h4>
              <h4>{currentResult.correctWords}</h4>
            </div>
            <div className="column">
              <h4>InCorrect Words</h4>
              <h4>{currentResult.inCorrectWords}</h4>
            </div>
          </div>
          <div className="row" style={{borderTop:'2px solid #003366'}}>
            <div className="column" style={{borderRight:'2px solid #003366'}}>
              <h4>WPM</h4>
              <h4>{ currentResult.WPM }</h4>
            </div>
            <div className="column">
              <h4>Accuracy</h4>
              <h4>
                {(correctWord !== 0 ? (
                    currentResult.Accuracy + "%"
                ) : (
                    "0%"
                ))}
              </h4>
            </div>
          </div>
        </div>
        <div className="avg-result-box">
          <div className="result-header">
            <h3>Average WPM</h3>
          </div>
          <div>
            <h4>{averageWpm}</h4>
          </div>
        </div>
      </div>
      <Sidebar profileName={profile} info={info} gamePlayed={numberOfTest} correctWord={totalCorrectWords} incorrectWord={totalIncorrectWords} correctChar={correctChar} averageWpm={averageWpm} averageAccuracy={averageAccuracy}/>
    </section>
  );
}

export default App;
