import './App.css';
import { useState } from "react";

const App = () => {
  const [rpsState, setRPSState] = useState({ 
    humanChoice: null,
    computerChoice: null,
    countdown: 3,
    round: 1,
    computerTally: 0,
    humanTally: 0,
    tieTally: 0,
    currentWinner: null
  });

  const choices = ["Rock", "Paper", "Scissors"];

  let tempSelections = {
    human: "",
    comp: ""
  }

  const selectWinner = ({ human, comp }) => {
    // Ties
    if (human === comp) {
      const tieCount = ++rpsState.tieTally;

      setRPSState(prevState => {
        return {
          ...prevState,
          tieTally: tieCount,
          currentWinner: "Draw!"
        }
      })

      // Stop checking other conditions
      return;
    }

    // Human wins
    if (
      (human === "rock" && comp === "scissors") ||
      (human === "paper" && comp === "rock") ||
      (human === "scissors" && comp === "paper")
    ) {
      const humanTally = ++rpsState.humanTally;

      setRPSState(prevState => {
        return {
          ...prevState,
          humanTally: humanTally,
          currentWinner: "You!"
        }
      })
    // All other possible outcomes = computer wins
    } else {
      const compTally = ++rpsState.computerTally;

      setRPSState(prevState => {
        return {
          ...prevState,
          computerTally: compTally,
          currentWinner: "The Machine"
        }
      })
    }
  }

  const computerChooses = () => {
    const choice = choices[Math.floor(Math.random() * choices.length)].toLowerCase();

    tempSelections.comp = choice;

    setRPSState(prevState => {
      return {
        ...prevState,
        computerChoice: choice
      }
    })

    countdown();
  }

  const countdown = () => {
    const countdownInterval = setInterval(() => 
    {
      const count = --rpsState.countdown;

      if (rpsState.countdown === 0) {
        clearInterval(countdownInterval)
        selectWinner(tempSelections);
      };

      setRPSState(prevState => {
        return {
          ...prevState,
          countdown: count
        }
      })
    }, 1000);
  }

  const choose = ({ target }) => {
    const choice = target.innerText.toLowerCase();

    tempSelections.human = choice;

    setRPSState(prevState => {
      return {
        ...prevState,
        humanChoice: choice
      }
    });

    computerChooses();
  }

  const playAgain = () => {
    const newRoundCount = ++rpsState.round;

    setRPSState(prevState => {
      return {
        ...prevState,
        humanChoice: null,
        computerChoice: null,
        countdown: 3,
        round: newRoundCount
      }
    });
  }

  const reset = () => {
    setRPSState({
      humanChoice: null,
      computerChoice: null,
      countdown: 3,
      round: 1,
      computerTally: 0,
      humanTally: 0,
      tieTally: 0,
      currentWinner: null
    });

    tempSelections = {
      human: "",
      comp: ""
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Rock, Paper, Scissors: The Game of Champions</h1>
      </header>
      <main>
        <section>
          <h2>Make Your Choice</h2>
          <div>
            {
              choices.map(value => (<button 
                key={value.toLowerCase()} 
                onClick={choose} 
                disabled={rpsState.humanChoice}>
                {value}
              </button>))
            }
          </div>
        </section>
        {rpsState.humanChoice && (
          <section>
            {
              rpsState.countdown ? 
              <h2>Computer Choice in {rpsState.countdown}...</h2> :
              <>
                <h2>Computer Chooses: {rpsState.computerChoice.charAt(0).toUpperCase() + rpsState.computerChoice.slice(1)}</h2>
                <h2>Round {rpsState.round} Winner: {rpsState.currentWinner}</h2>
                <button onClick={playAgain}>Play Again</button>
                <button onClick={reset}>Reset</button>
                <div className="row">
                  <div className="col-6">
                    <h3>Your Wins:</h3>
                    <h3>Computer Wins:</h3>
                    <h3>Ties:</h3>
                  </div>
                  <div className="col-6">
                    <h3>{rpsState.humanTally}</h3>
                    <h3>{rpsState.computerTally}</h3>
                    <h3>{rpsState.tieTally}</h3>
                  </div>
                </div>
              </>
            }
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
