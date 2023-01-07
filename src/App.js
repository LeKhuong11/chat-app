import { Route, Routes } from 'react-router-dom';
import ChatRoom from './components/ChatRoom/ChatRoom';
import Login from './components/Login/Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='login' element={<Login/>}/>
        <Route path='/' element={<ChatRoom/>}/>
      </Routes>
    </div>
  );
}

export default App;
