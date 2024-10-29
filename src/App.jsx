import './App.css';
import { Outlet } from 'react-router-dom';

import Header from './components/header/Header';

const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
