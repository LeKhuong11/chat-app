import { Router } from "./routes";
import './App.css';
import React, { useContext } from "react";
import { UserContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";

function App() {
  const { user } = useContext(UserContext);
  
  return (
    <React.StrictMode>
      <ChatContextProvider user={user} >
        <div className="App">
            <Router />
        </div>
      </ChatContextProvider>
    </React.StrictMode>
  );
}

export default App;

