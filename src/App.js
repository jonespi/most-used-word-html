import { useState } from 'react';
import { getLinkData } from  './services'
import { parseTextMap } from './utils'

const App = () => {
  const [url, setUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [textView, setTextView] = useState(null);
  const [mostUsed, setMostUsed] = useState(null);
  const [highlightedWord, setHighlightedWord] = useState(null);
  const [hasError, setHasError] = useState(false);
  
  const displayTextView = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    resetState();
    try { 
      const text = await getLinkData(url); 
      if (text.length > 0) {
        setTextView(text);
        parseMap(text);
        setIsLoading(false);
      } else {
        setHasError(true);
        setIsLoading(false);
      }
    } catch {
      setHasError(true);
      setIsLoading(false);
    }
  };

  const parseMap = (text) => {
    const map = parseTextMap(text);
    if (map.length > 0) {
      setMostUsed(map);
    } else {
      setMostUsed(null);
    }
  }

  const resetState = () => {
    setHasError(false);
    setTextView(null);
    setMostUsed(null);
    setHighlightedWord(null);
  }

  return (
    <div className="App">
      <form onSubmit={(e) => displayTextView(e)}>
        <h1>Enter a URL</h1>
        <input 
          type="text" 
          className="url-text"
          placeholder="http://cushion.ai"
          onChange={e => setUrl(e.target.value)}
          />
        {!isLoading ? (
          <input 
            disabled={!url}
            className="submit-button"
            type="submit" />
        ) : (
          <p>LOADING...</p>
          )
        }
      </form>
      <div className="content">
        {textView && (
          <div className="text-view">
            {textView.map(word => {
              return (
                <>
                  <span 
                    className={highlightedWord === word.toLowerCase() && 'highlighted'}
                    onClick={() => setHighlightedWord(word.toLowerCase())}>
                    {word}
                  </span>
                  {' '}
                </>
              ) 
            })}
          </div>
        )}
        {mostUsed && (
          <div className="most-used">
            <h2>Most Used Words</h2>
            <h3 className="most-used-subheader">
              <span>Word {' '}</span> 
              <span>Times Used</span>  
            </h3>
            {mostUsed.map(word => {
              return (
                <div
                  className={`most-used-word ${highlightedWord === word[0].toLowerCase() && 'highlighted'}`} 
                  onClick={() => setHighlightedWord(word[0].toLowerCase())}>
                  <span>{word[0]}</span> 
                  <span>{word[1]}</span>
                </div>
              )})}
          </div>
        )}
      </div>
      {hasError && (
        <div className="error">There was an issue with your URL. Please try a different one or try again.</div>
      )}
      <style jsx>
        {`
          * {
            font-family: 'Roboto', sans-serif;
          }
          form {
            display: flex;
            align-items: center;
            margin: 0 auto;
            padding: 0 auto;
            flex-direction: column;
            margin-top: 25px;
            margin-bottom: 20px;
          }
          .content {
            margin: 0 auto;
            padding: 0 auto;
            max-width: 1024px;
            height: 60vh;
            display: flex;
          }
          .text-view {
            flex: 2;
            height: 800px;
            overflow: scroll;
          }
          .text-view span {
            cursor: pointer;
          }
          .text-view::-webkit-scrollbar {
            display: none;
          }
          .most-used {
            flex: 1;
            margin-left: 10px;
            padding-right: 20px;
          }
          .most-used-subheader, .most-used-word {
            width: 300px;
            display: flex;
            justify-content: space-between;
          }
          .most-used-word {
            margin: 10px 0;
            padding: 5px 0;
            cursor: pointer;
          }
          .url-text {
            width: 350px;
            margin-bottom: 10px;
          }
          .submit-button {
            width: 250px;
            padding: 5px;
            border-radius: 5px;
          }
          .submit-button:not([disabled]):hover {
            background-color: lightblue;
            cursor: pointer;
          }
          .highlighted {
            font-weight: 900;
            background-color: yellow;
            color: red;
          }
          .error {
            margin: 0 auto;
            text-align: center;
            max-width: 1024px;
          }
        `}
      </style>
    </div>
  );
}

export default App;
