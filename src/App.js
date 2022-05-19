import './App.css';
import React, {useState,useEffect,useRef} from "react";
import randomWords from "random-words";
import TextBox from "./components/TextBox";
import ResultBox from "./components/ResultBox";
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
  const wpm = (numberOfChar,runningTime) => {
    return Math.round((numberOfChar/5)/runningTime)
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
  const [numberOfChar,setNumberOfChar] = useState(0);
  const textInput = useRef(null);
  const {isShowing, toggle} = useModal();
  const [runningTime,setRunningTime] = useState(0);

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
  },[status]);

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
      setNumberOfChar(0);
      setRunningTime(0);
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
      setNumberOfChar(numberOfChar - 1);
    } else {
      setCurrentCharIndex(currentCharIndex + 1);
      setCurrentChar(key);
      setNumberOfChar(numberOfChar + 1);
      setRunningTime(((10-count)/10));
    }
  }
  const checkWord = () => {
    if(words[currentWordIndex] === currentValue.trim()){
      setCorrectEntity([...correctEntity,words[currentWordIndex]]);
      setCorrectWord(correctWord + 1);
      setCurrentResult({ correctWords:correctWord+1, inCorrectWords:incorrectWord, WPM:wpm(numberOfChar,runningTime), Accuracy:accuracy(correctWord+1,incorrectWord)});
    }
    else{
      setIncorrectWord(incorrectWord + 1);
      setCurrentResult({ correctWords:correctWord, inCorrectWords:incorrectWord+1, WPM:wpm(numberOfChar,runningTime), Accuracy:accuracy(correctWord,incorrectWord+1)});
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
  const averageAccuracy = (numberOfTest === 0) ? ( 0 ) : ( Math.round(sumOfAccuracy / numberOfTest));
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
        <TextBox
            count={count}
            textInput={textInput}
            handleKeyUpdate={handleKeyUpdate}
            status={status}
            currentValue={currentValue}
            setCurrentValue={setCurrentValue}
            countDownStart={countDownStart}
            words={words}
            setCharClass={setCharClass}
        />
        <ResultBox
            correctWord={correctWord}
            incorrectWord={incorrectWord}
            currentResult={currentResult}
            averageWpm={averageWpm}
        />
      </div>
      <Sidebar profileName={profile}
               info={info}
               gamePlayed={numberOfTest}
               correctWord={totalCorrectWords}
               incorrectWord={totalIncorrectWords}
               correctChar={correctChar}
               averageWpm={averageWpm}
               averageAccuracy={averageAccuracy}
      />
    </section>
  );
}

export default App;
