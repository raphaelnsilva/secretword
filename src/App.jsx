// css
import './App.css';
// react 
import { useCallback, useEffect, useState } from 'react';
// data 
import { wordsList } from "./data/words";
// componentes
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stage = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
];

const guessesQty = 6;

function App() {
  const [gameStage, setGameStage] = useState(stage[0].name);
  const [words] = useState(wordsList);
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]); 
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0); 

  const pickWordAndCategory = useCallback(() => {

    //pick random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
    
    // pick random word
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    
    return {word, category};
  }, [words]);

  // start game
  const startGame = useCallback(() => {

    // clear all letters 
    clearLetterStates();

    // pick word and pick category
    const { word, category } = pickWordAndCategory();

    // create an array of letters
    let wordLetters = word.split(""); // separa as letras da palavra
    wordLetters = wordLetters.map((l) => l.toLowerCase()); 
  
    // fill states 
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
    setGameStage(stage[1].name);
    
  }, [pickWordAndCategory]);

  // processa a letra do input
  const verifyLetter = (letter) => {

    // nomarliza a letra para minuscula.
    const normalizedLetter = letter.toLowerCase();

    // checa se a letra já foi utilizada
    if (
      guessedLetters.includes(normalizedLetter) || 
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // verifica se a letra está certa e push
    if(letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);
      setGuesses((actualGuesses) => actualGuesses -1);
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }
  // check if guesses ended
  useEffect(() => {
    if(guesses <= 0) {
      clearLetterStates()
      // reset all states
      setGameStage(stage[2].name);
      
    }
  }, [guesses])
  // check win condintion 
  useEffect(() => {
    const uniqueLetters = [... new Set(letters)];

    // win condition
    if (guessedLetters.length === 
        uniqueLetters.length && 
        gameStage === 
        stage[1].name) {

      // add score 
      setScore((actualScore) => actualScore += 100)
      
      // restart game with new word
      startGame();
    }

    
  }, [guessedLetters, letters, startGame]);

  // restarts the game 
  const retry = () => {
    setScore(0);
    setGuesses(guessesQty);
    setGameStage(stage[0].name);
  }

  return (
    <>
      <div className="App">
        {gameStage === 'start' && <StartScreen startGame={startGame} />}

        {gameStage === 'game' && <Game 
          verifyLetter={verifyLetter} 
          pickedWord={pickedWord} 
          pickedCategory={pickedCategory}
          letters={letters} 
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />}

        {gameStage === 'end' && <GameOver 
          retry={retry} 
          score= {score}
        />}
      </div>
    </>
  )
}

export default App
