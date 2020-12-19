import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState('Empty Message.');
  const pingHandler = async () => (
    fetch('/ping')
      .then(res => res.json())
      .then(json => setMessage(json.message))
      .catch(err => console.log(err))
  )

  return (
    <div className="App">
      <p>
        Click to ping:
        <button onClick={pingHandler}>PING</button>
      </p>
      <p>
        {message}
      </p>
    </div>
  );
}

export default App;
