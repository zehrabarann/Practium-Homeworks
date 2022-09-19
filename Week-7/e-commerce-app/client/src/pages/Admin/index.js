import { Box, Link } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import Products from "../Products"
import Home from "./Home"
import Orders from "./Orders"
import { useLocation } from "react-router-dom"


const Admin = () => {
    return (
        <div>
            <nav>
                <ul className="admin-menu">
                    <li>
                        <Link to="/admin">Home</Link>
                    </li>
                    <li>
                        <Link to="/admin/orders">Orders</Link>
                    </li>
                    <li>
                        <Link to="admin/products">Products</Link>
                    </li>
                </ul>
            </nav>

            <Box>Content</Box>
            <Routes>
                <Route path="/admin" element={<Home />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/products" element={<Products />} />
            </Routes>
        </div>
    )
}

export default Admin