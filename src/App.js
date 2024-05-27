import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Logo from './components/common/Logo';

function App() {
  return (
    <div className="container">
      <Logo />
      <BrowserRouter></BrowserRouter>
    </div>
  );
}

export default App;
