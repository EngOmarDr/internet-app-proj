import './App.css';
import { Navigate, Outlet } from 'react-router-dom';
import Header from './pages/header/Header';
import Footer from './components/Footer';
import { accessToken } from './utils/constant';

const App = () => {

  if(!localStorage.getItem(accessToken)){
    return <Navigate to='/login'/>
  }

  return (
    <div className="app">
      <Header />
      <div className="content fix-height">
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};

export default App;
