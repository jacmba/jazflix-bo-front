import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Logo from './components/common/Logo';
import Home from './components/pages/home/Home';
import Users from './components/pages/users/Users';
import NewUser from './components/pages/users/NewUser'
import EditUser from './components/pages/users/EditUser'
import Sections from './components/pages/sections/Sections';

function App() {
  return (
    <div className="container">      
      <BrowserRouter>
        <Logo />
        <Routes>
          <Route path='/' Component={Home} />

          <Route path='/users' Component={Users} />
          <Route path='/users/new' Component={NewUser} />
          <Route path='/users/:id' Component={EditUser} />

          <Route path='/sections' Component={Sections} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
