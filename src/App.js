import React, { useState } from 'react';
import './App.css';

function App() {
  //Here is our array of snippets for user to choose from and type.
  const SNIPPETS = ["A user interface is like a joke. If you have to explain it, it's not that good.",
  "Why couldn't the programmer dance to the song? Because they didn't get the algo-rhythm",
  "Why don't programmers like nature? It has too many bugs!",
  "Why did the programmer quit his job? No matter how many times he asked he couldn't get arrays!"]

  //Here we are setting initial states for game winning, snippets, gamestate and usertext as well as setting up functions to aler that state.
  const INITIAL_GAME_STATE = { victory: false, startTime: null, endTime: null };
  //Here we're intializing state for snippet, gameState and userText. The blank strings indicate that the intial state for snippet, gameState and userText will be an empty string. The second item in each array,setSnippet, setGameState and setUserText all are functions that will update the state value for snippet, gameState or userText.
  const [snippet, setSnippet] = useState("")
  const [gameState, setGameState] = useState("")
  const [userText, setUserText] = useState ("");

  // UpdateUserText is a helper function that passes in the value from a users input (event.target.value) and calls setUserText to update state based on the users input. When the users input exactly matches the snippet, the victory state is triggered and victory becomes true, and end time is recorded as the current time - the start time

  const updateUserText = event => {
    setUserText(event.target.value);
    if (event.target.value === snippet){
      setGameState({
        ...gameState,
        victory: true,
        endTime: new Date().getTime() - gameState.startTime
      });
    }
  }
   //This ChooseSnippet function allows users to select a snippet to type based on the snippetIndex in the array SNIPPETS. The double arrow function sets up chooseSnippet to return a callback function itself. For example, chooseSnippet(0) returns a function that will end up calling setSnippet(SNIPPETS[0]). Additionally, when a user chooses a snippet,  
  const chooseSnippet = snippetIndex => () => {console.log('setSnippet', snippetIndex);
  setSnippet(SNIPPETS[snippetIndex]);
  setGameState({ ...gameState,startTime: new Date().getTime() });
  if(gameState.victory === true){
    setGameState({
      victory:false,
      startTime:new Date().getTime()
    })
  }
  setUserText("")
  }

  return (
    <div className="App">
      <div className="title">
        <h2>Type Race</h2>
      </div>
      {/* The HR tag stands for hotizontal rule and is used to create a horizontal line to split content */}
      <hr />
      <div className="snippetAndInput">
      <h3>Snippet</h3>
      {snippet}
      <h4>{gameState.victory ? `Done! Your time was ${gameState.endTime / 1000} seconds` : null}</h4>
      <input value={userText} onChange={updateUserText} />
      <hr />
      </div>
      <div className="snippetChoice">
      {
        SNIPPETS.map((SNIPPET, index) => (
          <button onClick={chooseSnippet(index)} key={index}>
            {/* Here we're mapping through the snippets array, turning each snippet into a button. When one clicks on that button, it calls the chooseSnippet function and chooses the snippet the user clicks on. The text displayed for the button is a substring, the 0,10 indicates that the first 10 characters of the snippet will be the text for the button.*/}
            {SNIPPET.substring(0, 10)}...
          </button>
        ))
      }
      </div>
      <div className="counter">

      </div>
    </div>
  );
}

export default App;
