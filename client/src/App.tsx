import { Router } from "./routes";
import './App.css';
import { UserContextProvider } from "./context/AuthContext";
import React from "react";

function App() {
  return (
    <React.StrictMode>
        <div className="App">
          <UserContextProvider>
            <Router />
          </UserContextProvider>
        </div>
    </React.StrictMode>
  );
}

export default App;

