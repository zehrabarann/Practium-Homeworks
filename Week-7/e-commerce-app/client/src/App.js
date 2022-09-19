import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Signin from './pages/Auth/Signin';
import Signup from './pages/Auth/Signup';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import PrivateRoute from './pages/PrivateRoute';
import Basket from './pages/Basket';
import Error404 from './pages/Error404';
import Admin from './pages/Admin';
import Orders from './pages/Admin/Orders';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />}></Route>
        <Route path="/product/:product_id" element={<ProductDetail />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/basket" element={<Basket />}></Route>
        <Route path="/*" element={<Error404 />}></Route>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/admin" element={<Admin />} admin={true}></Route>
          <Route path="/orders" element={<Orders />}></Route>
          <Route path="/products" element={<Products />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}



export default App;
