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

  const selectWinner = () => {
    console.log(rpsState.humanChoice);

    if (rpsState.humanChoice === rpsState.computerChoice) {
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

    if (
      (rpsState.humanChoice === "rock" && rpsState.computerChoice === "scissors") ||
      (rpsState.humanChoice === "paper" && rpsState.computerChoice === "rock") ||
      (rpsState.humanChoice === "scissors" && rpsState.computerChoice === "paper")
    ) {
      const humanTally = ++rpsState.humanTally;

      setRPSState(prevState => {
        return {
          ...prevState,
          humanTally: humanTally,
          currentWinner: "You!"
        }
      })
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
        selectWinner();
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
    setRPSState(prevState => {
      return {
        ...prevState,
        humanChoice: target.innerText.toLowerCase()
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
              choices.map((value, i) => (<button key={value.toLowerCase()} onClick={choose} disabled={rpsState.humanChoice}>{value}</button>))
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
              </>
            }
            <button onClick={reset}>Reset</button>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
