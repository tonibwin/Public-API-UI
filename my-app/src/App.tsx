import React from 'react';
import './App.css';
import PublicApiDisplay from "./components/public-api-display";

function App() {
  return (
    <div className="App">
        <PublicApiDisplay category="Business"/>
    </div>
  );
}

export default App;
