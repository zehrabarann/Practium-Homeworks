import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useBasket } from "../../contexts/BasketContext";
import styles from "./styles.module.css";

const Navbar = () => {
  const { loggedIn, user } = useAuth();
  const { items } = useBasket();
  console.log(loggedIn);

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to="/">E-commerce</Link>
        </div>
        <ul className={styles.menu}>
          <li>
            <Link to="/">Products</Link>
          </li>
        </ul>
      </div>
      <div className="right">
        {!loggedIn && (
          <>
            <Link to="/signin">
              <Button colorScheme="telegram" mr="15px">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button colorScheme="telegram">Register</Button>
            </Link>
          </>
        )}

        {loggedIn && (
          <>
            {items.length > 0 && (
              <Link to="/basket">
                <Button colorScheme="teal">Basket {items.length}</Button>
              </Link>
            )}

            {user?.role === "admin" && (
              <Link to="/admin">
                <Button colorScheme="pink" variant="ghost">
                  Admin
                </Button>
              </Link>
            )}
            <Link to="/profile">
              <Button colorScheme="telegram">Profile</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
