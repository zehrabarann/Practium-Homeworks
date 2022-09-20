import {  Link } from "@chakra-ui/react"



const Admin = () => {
    return (
        <div>
            <nav>
                <ul className="admin-menu">
                    <li>
                        <Link to={`/admin/home`} >Home</Link>
                    </li>
                    <li>
                        <Link to="/admin/orders">Orders</Link>
                    </li>
                    <li>
                        <Link to="/admin/products">Products</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Admin