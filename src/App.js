import './App.css';
import { useState } from "react";

const App = () => {
  const [rpsState, setRPSState] = useState({ 
    humanChoice: "",
    computerChoice: "",
    countdown: 3
  });

  const choose = ({ target }) => {
    setRPSState({
      humanChoice: target.innerText.toLowerCase(),
      computerChoice: "",
      countdown: 3
    });

    alert(rpsState.humanChoice);
  }

  const humanChoices = ["Rock", "Paper", "Scissors"];

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
              humanChoices.map((value, i) => (<button key={i} onClick={choose} active={rpsState.humanChoice}>{value}</button>))
            }

            {/* <button onClick={choose} active={rpsState.humanChoice}>Rock</button>
            <button onClick={choose}>Paper</button>
            <button onClick={choose}>Scissors</button> */}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
