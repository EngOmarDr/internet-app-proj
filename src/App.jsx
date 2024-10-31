import './App.css';
import { Navigate, Outlet } from 'react-router-dom';
import Header from './pages/header/Header';

const App = () => {

  if(!localStorage.getItem('authToken')){
    return <Navigate to='/login'/>
  }

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
