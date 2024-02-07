
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import About from './Pages/About';
import Services from './Pages/Services';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Privaterouter from './components/Privateroute';
import Userdashboard from './Pages/user-routes/Userdashboard';
import Profileinfo from './Pages/user-routes/ProfileInfo';

function App() {
  return (
    <>
      <BrowserRouter>
      <ToastContainer position='bottom-center'/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/services' element={<Services/>}/>
          <Route path='/user' element={<Privaterouter/>}>
            <Route path='dashboard' element={<Userdashboard/>}/>
            <Route path='profile-info' element={<Profileinfo/>}/>
          </Route>
        </Routes>
      
      </BrowserRouter>
      
    </>
  );
}

export default App;
