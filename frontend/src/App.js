import Login from './components/Login';
import HomePage from './components/HomePage';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './components/Signup';

const router = createBrowserRouter([
  {
    path:"/",
    element:<HomePage/>
  },
  {
    path:"/register",
    element:<Signup/>
  },
  {
    path:"/Login",
    element:<Login/>
  },
 
])
function App() {
  return (
    <div className="p=4 h-screen flex items-center justify-center" >
      
      <RouterProvider router={router}/>

    </div>
  );
}

export default App;
