import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './LayOuts/Main';
import Inventory from './components/Inventory/Inventory';
import Order from './components/Orders/Order';
import Shop from './components/Shop/Shop';
import { productAndCartLoader } from './components/Loaders/productAndCartLoader';
import LogIn from './Login/LogIn';
import Register from './Registration/Register';
import Shipping from './components/Shipping/Shipping';
import PrivateRoutes from './routes/PrivateRoutes';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          element: <Shop></Shop>
        },
        {
          path: "/order",
          loader: productAndCartLoader,
          element: <PrivateRoutes> <Order></Order></PrivateRoutes>
        },
        {
          path: "/inventory",
          element: <Inventory></Inventory>
        },
        {
          path: "/Shipping",
          element: <PrivateRoutes> <Shipping></Shipping> </PrivateRoutes>
        },
        {
          path: 'login',
          element: <LogIn></LogIn>
        },
        {
          path: 'register',
          element: <Register></Register>
        }
      ]

    },
    { path: '*', element: <div>404! Page Not Found</div> }

  ]);



  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
