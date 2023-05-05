//npm run devStart
import {useContext} from 'react';
import './styles.scss'
import './App.scss'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Profile from './profile/Profile';
import Login from './login/Login';
import RegistrationForm from './registration/RegistrationForm';
import { AuthContext } from './context/AuthContext';
import Navbar from './navbar/Navbar';
import { DarkModeContext } from './context/DarkModeContext';
import FullRoom from './forRoom/FullRoom';

function App() {

  const {darkMode} = useContext(DarkModeContext);
  const {currentUser} = useContext(AuthContext); 

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ flex: 6 }}>
            <Outlet />
        </div>
      </div>
    )
  }

  const ProtectedRoute = ({children}) => {
    if(!currentUser) {
      return <Navigate to="/login" />
    }

    return children;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute><Layout /></ProtectedRoute>,
      children: [
        {
          path:"/profile/:id", 
          element: <Profile />
        }, 
        {
          path: "/profile/:id/room/:roomName",
          element: <FullRoom />,
        },
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <RegistrationForm />,
    },
  ]);


  
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
