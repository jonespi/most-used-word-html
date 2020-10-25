import { useEffect, useState } from 'react';
import './App.css';
import { getLinkData } from  './services'
import { parseTextMap } from './utils'

const App = () => {
  const [url, setUrl] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [textView, setTextView] = useState(null);
  const [mostUsed, setMostUsed] = useState(null);
  const [highlightedWord, setHighlightedWord] = useState(null);
  
  useEffect(() =>  {
    
  }, []);

  const displayTextView = async (e) => {
    e.preventDefault();
    setClicked(true);
    resetState();
    const text = await getLinkData(url);
    setTextView(text);
    parseMap(text);
    setClicked(false);
  };

  const parseMap = (text) => {
    const map = parseTextMap(text);
    if (text !== []) {
      setMostUsed(map);
    } else {
      setMostUsed('No data');
    }
  }

  const resetState = () => {
    setTextView(null);
    setMostUsed(null);
    setHighlightedWord(null);
  }

  return (
    <div className="App">
      <form onSubmit={(e) =>displayTextView(e)}>
        <input 
          type="text" 
          placeholder="Enter a url"
          onChange={e => setUrl(e.target.value)}
          />
        {!clicked ? (
          <input type="submit" />
        ) : (
          <p>LOADING...</p>
          )
        }
      </form>
      {textView && (
        <div>
          {textView.map(word => {
            return (
              <>
                <span 
                  className={highlightedWord === word.toLowerCase() && 'highlighted'}
                  onClick={() => setHighlightedWord(word.toLowerCase())}>
                  {word} {' '}
                </span>
              </>
            ) 
          })}</div>
      )}
      {mostUsed && (
        <div>
        <h2>Most Used Words</h2>
        <p>Word - Times Used</p>
        {mostUsed.map(word => {
          return (
            <p onClick={() => setHighlightedWord(word[0].toLowerCase())}>
              {word[0]}: {word[1]}
            </p>
          )}
        )}
        </div>
      )}
      <style jsx>
        {`
          .highlighted {
            background-color: yellow;
            color: red;
          }
        `}
      </style>
    </div>
  );
}

export default App;
