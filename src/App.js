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

  // Object to hold selections for comparison in selectWinner function
  let tempSelections = {
    human: "",
    comp: ""
  }

  // Determines winner based on human and computer selections
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
    // Human wins
    } else if (
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

  // Sets computer selection
  const computerChooses = () => {
    // Choose R-P-S based on random index number from 0-2
    const choice = choices[Math.floor(Math.random() * choices.length)].toLowerCase();

    // Update corresponding tempSelections object property
    tempSelections.comp = choice;

    // Store computerChoice in state
    setRPSState(prevState => {
      return {
        ...prevState,
        computerChoice: choice
      }
    });
  }

  // Initiate countdown before displaying results
  const countdown = () => {
    const countdownInterval = setInterval(() => 
    {
      const count = --rpsState.countdown;

      if (rpsState.countdown === 0) {
        // Stop countdown
        clearInterval(countdownInterval);

        // Determine results
        selectWinner(tempSelections);
      };

      // Store countdown in state for conditional rendering of results section
      setRPSState(prevState => {
        return {
          ...prevState,
          countdown: count
        }
      })
    // Countdown = 1 second interval
    }, 1000);
  }

  // Sets human choice
  const choose = ({ target }) => {
    // Takes value of button clicked AKA event target
    const choice = target.innerText.toLowerCase();

    // Update corresponding tempSelections object property
    tempSelections.human = choice;

    setRPSState(prevState => {
      return {
        ...prevState,
        humanChoice: choice
      }
    });

    // Initiate countdown
    countdown();

    // Make computer selection
    computerChooses();
  }

  // Play again with same scores
  const playAgain = () => {
    // Increment round total
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

  // Play again and wipe all scores to 0
  const reset = () => {
    // Reset to initial state
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
      <header className="text-center pb-2">
        <h1>Rock, Paper, Scissors:<br />The Game of Champions</h1>
      </header>
      <main>
        <section className="text-center mb-4">
          <h2>Make Your Choice</h2>
          <div>
            {
              // Creates three buttons with RPS values from choices array
              choices.map(value => (
              <button 
                // Key is choices name since values never repeat
                key={value.toLowerCase()} 
                onClick={choose} 
                // If human choice has been made, disable button
                disabled={rpsState.humanChoice}
                // If human choice matches value of button, assign chosen CSS class to highlight button
                className={rpsState.humanChoice === value.toLowerCase() ? "chosen" : undefined}>
                {value}
              </button>))
            }
          </div>
        </section>
        {/* If human choice has been made AKA button has been pressed */}
        {rpsState.humanChoice && (
          <section>
            {
              rpsState.countdown ? 
              // If countdown is greater than 0 (truthy), show countdown module
              <h2 className="text-center">Computer Choice in {rpsState.countdown}...</h2> :
              // If countdown is 0 (falsy), show results section
              <>
                <div className="text-center mb-5">
                  {/* Capitalize computer choice result */}
                  <h2>Computer Chooses: {rpsState.computerChoice.charAt(0).toUpperCase() + rpsState.computerChoice.slice(1)}</h2>
                  <h2 className="mb-3">Round {rpsState.round} Winner: {rpsState.currentWinner}</h2>
                  <button onClick={playAgain}>Play Again</button>
                  <button onClick={reset}>Reset</button>
                </div>
                
                {/* Scores */}
                <div className="row d-flex justify-content-center">
                  {/* Labels in first column */}
                  <div className="col-8 col-sm-4 tally-keys">
                    <h3>Your Wins:</h3>
                    <h3>Computer Wins:</h3>
                    <h3>Ties:</h3>
                  </div>
                  {/* Tallies in second column */}
                  <div className="col-4 col-sm-3">
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
