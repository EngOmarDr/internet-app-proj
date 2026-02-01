import './App.css';
import { Navigate, Outlet } from 'react-router-dom';
import Header from './pages/header/Header';
import Footer from './components/Footer';
import { ACCESS_TOKEN_KEY} from './utils/constant';
import { onMessage } from 'firebase/messaging';
import { ToastContainer } from 'react-toastify';
import Message from './components/message';
import { messaging } from './utils/firebaseConfig';

const App = () => {

  if(!localStorage.getItem(ACCESS_TOKEN_KEY)){
    return <Navigate to='/login'/>
  }

  onMessage(messaging, (payload) => {
    toast(<Message notification={payload.notification} />);
  });

  return (
    <div className="app">
      <Header />
      <div className="content fix-height">
        <Outlet />
      </div>
      <Footer/>
      <ToastContainer />
    </div>
  );
};

export default App;
