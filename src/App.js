import { Navbar } from "./components/Navbar"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Recipes from "./pages/Recipes";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from "./hooks/useAuthContext";
import Menu from './pages/Menu';
import Home from './pages/Home'

function App() {
  const { user } = useAuthContext()
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
          <Route 
              path='/'
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route 
              path='/menus'
              element={user ? <Menu /> : <Navigate to="/login" />}
            />
            <Route 
              path='/recipes'
              element={user ? <Recipes /> : <Navigate to="/login" />}
            />
            <Route 
              path='/login'
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route 
              path='/signup'
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
