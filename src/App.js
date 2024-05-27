import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Logo from './components/common/Logo';
import Home from './components/pages/home/Home';
import Users from './components/pages/users/Users';

function App() {
  return (
    <div className="container">
      <Logo />
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/users' Component={Users} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
