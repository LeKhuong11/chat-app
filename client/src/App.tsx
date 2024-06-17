import { Router } from "./routes";
import './App.css';
import { UserContextProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <UserContextProvider>
        <div className="App">
          <Router />
        </div>
      </UserContextProvider>
    </>
  );
}

export default App;

