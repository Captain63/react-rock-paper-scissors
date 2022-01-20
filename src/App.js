import './App.css';
import { useState } from "react";

const App = () => {
  const [rpsState, setRPSState] = useState({ 
    humanChoice: null,
    computerChoice: null,
    countdown: 3
  });

  const humanChoices = ["Rock", "Paper", "Scissors"];

  const countdown = () => {
    const countdownInterval = setInterval(() => 
    {
      if (rpsState.countdown === 0) clearInterval(countdownInterval);

      const count = rpsState.countdown--;

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

    countdown();
  }

  const reset = () => {
    setRPSState({
      humanChoice: null,
      computerChoice: null,
      countdown: 3
    });
  }

  return (
    <div className="App">
      <header>
        <h1>The Game of Champions</h1>
      </header>
      <main>
        <section>
          <h2>Make Your Choice</h2>
          <div>
            {
              humanChoices.map((value, i) => (<button key={value.toLowerCase()} onClick={choose} disabled={rpsState.humanChoice}>{value}</button>))
            }
          </div>
        </section>
        {rpsState.humanChoice && (
          <section>
            {
              rpsState.countdown ? 
              <h2>Computer Choice in {rpsState.countdown}...</h2> :
              <h2>Computer Chooses:</h2>
            }
            <button onClick={reset}>Reset</button>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
