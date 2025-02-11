import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Profile from './pages/Profile';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import About from './pages/about';
import SignIn from './pages/Sign-In';

export default function App() {
  return (
    
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile />} />
    </Routes>
    </BrowserRouter>
  )
}
