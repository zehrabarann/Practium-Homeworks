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
import Basket from './pages/Basket';
import Error404 from './pages/Error404';
import Admin from './pages/Admin';
import Orders from './pages/Admin/Orders';
import Home from './pages/Admin/Home';
import { useAuth } from './contexts/AuthContext';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminProductDetail from './pages/Admin/AdminProductDetail';
import NewProduct from './pages/Admin/AdminProducts/new';


function App() {
  const { loggedIn, user } = useAuth();


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />}></Route>
        <Route path="/product/:product_id" element={<ProductDetail />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/basket" element={<Basket />}></Route>
        {loggedIn && user.role === "admin" && <>
          <Route path="/admin/home" element={<Home />} admin={true}></Route>
          <Route path="/admin/orders" element={<Orders />}></Route>
          <Route exact path="/admin" element={<Admin />} admin={true}></Route>
          <Route  path="/admin/products" element={<AdminProducts />}></Route>
          <Route  path="/admin/products/new" element={<NewProduct />}></Route>
          <Route path="/admin/products/:product_id" element={<AdminProductDetail />}></Route>
        </>}
        {loggedIn && <Route path="/profile" element={<Profile />}></Route>}

        <Route path="/*" element={<Error404 />}></Route>
        {/* <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/admin" element={<Admin />} admin={true}></Route>
          <Route path="/admin/home" element={<Home />} admin={true}></Route>
          <Route path="/orders" element={<Orders />}></Route>
          <Route path="/products" element={<Products />}></Route>
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
}



export default App;
