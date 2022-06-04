import React, { useState, useEffect, useContext } from "react";
import Symbol from "./components/Symbol";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import themeStyle from "./styles";
import "./App.css"

import ThemeContext from "./context/ThemeContext";

const GameBoard = () => {
  const [theme, setTheme] = useContext(ThemeContext)
  const [gameGrid, setGameGrid] = useState(Array(9).fill(null));
  const [circleTurn, setCircleTurn] = useState(true);
  const [victor, setVictor] = useState(null);
  const [instruction, setInstruction] = useState("Circle Plays First");


  const resetGame = () => {
    setGameGrid(Array(9).fill(null));
    setCircleTurn(true);
    setVictor(null);
    setInstruction("Circle Plays First");
  };
  const checkVictory = () => {
    if (
      gameGrid[0] === gameGrid[1] &&
      gameGrid[1] === gameGrid[2] &&
      gameGrid[2] != null
    ) {
      setVictor(gameGrid[0]);
    } else if (
      gameGrid[3] === gameGrid[4] &&
      gameGrid[4] === gameGrid[5] &&
      gameGrid[5] != null
    ) {
      setVictor(gameGrid[3]);
    } else if (
      gameGrid[6] === gameGrid[7] &&
      gameGrid[7] === gameGrid[8] &&
      gameGrid[8] != null
    ) {
      setVictor(gameGrid[6]);
    } else if (
      gameGrid[0] === gameGrid[4] &&
      gameGrid[4] === gameGrid[8] &&
      gameGrid[8] != null
    ) {
      setVictor(gameGrid[0]);
    } else if (
      gameGrid[2] === gameGrid[4] &&
      gameGrid[4] === gameGrid[6] &&
      gameGrid[6] != null
    ) {
      setVictor(gameGrid[2]);
    } else if (
      gameGrid[0] === gameGrid[3] &&
      gameGrid[3] === gameGrid[6] &&
      gameGrid[6] != null
    ) {
      setVictor(gameGrid[0]);
    } else if (
      gameGrid[1] === gameGrid[4] &&
      gameGrid[4] === gameGrid[7] &&
      gameGrid[7] != null
    ) {
      setVictor(gameGrid[1]);
    } else if (
      gameGrid[2] === gameGrid[5] &&
      gameGrid[5] === gameGrid[8] &&
      gameGrid[8] != null
    ) {
      setVictor(gameGrid[2]);
    }
  };

  useEffect(() => {
    if (victor !== null) {
      if (victor === true) {
        setInstruction("Circle Wins");
        toast.success("Circle Wins");
      } else {
        setInstruction("Cross Wins");
        toast.success("Cross Wins");
      }
    }
  }, [victor]);

  const playTurn = (index) => {
    if (victor != null) {
      if (victor === true) toast.error("Game already won by Circle");
      else toast.error("Game already won by Cross");
    } else if (gameGrid[index] != null) {
      toast.error("Grid Already Filled");
    } else {
      gameGrid[index] = circleTurn;
      console.log(gameGrid);

      setCircleTurn(!circleTurn);

      if (!circleTurn) setInstruction("Next turn is Circle");
      else setInstruction("Next turn is Cross");
      checkVictory();
    }
  };

  return (
    <div className="game-container" style={themeStyle[theme]}>
      <div className="title-msg">{instruction}</div>
      <span>
        {gameGrid.map((item, index) => {
          if ((index + 1) % 3 === 0) {
            return (
              <span key={index}>
                <button key={index} onClick={() => playTurn(index) } style={themeStyle[theme]}>
                  <Symbol type={item} />
                </button>
                <br />
              </span>
            );
          } else
            return (
              <button key={index} onClick={() => playTurn(index)} style={themeStyle[theme]}>
                <Symbol type={item} />
              </button>
            );
        })}
        <ToastContainer />
      </span>
      <button onClick={resetGame} style={themeStyle[theme]}>Restart</button>
      <button onClick={() => {theme === "light"? setTheme("dark"): setTheme("light")}} style={themeStyle[theme]}>Change Theme</button>
    </div>
  );
}

const App = () => {
  const [theme, setTheme] = useState("light");
  
  return(
    <ThemeContext.Provider value={[theme, setTheme]}>
      <GameBoard/>
    </ThemeContext.Provider>
  )

};

export default App;
