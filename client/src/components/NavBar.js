import React, { useContext } from "react";
import { Context } from "../index";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { SHOP_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaUserPlus, FaSignOutAlt, FaUserShield } from "react-icons/fa";


const NavBar = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    navigate(SHOP_ROUTE);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to={SHOP_ROUTE}>
          SkateShop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            {user.isAuth ? (
              <>
                <Button
                  variant="outline-light"
                  className="me-2"
                  onClick={() => navigate("/admin")}
                >
                  <FaUserShield size={20} /> {/* Иконка админ панели */}
                  </Button>
                <Button variant="outline-light" onClick={logOut}>
                <FaSignOutAlt size={20} /> {/* Иконка выхода */}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline-light"
                  className="me-2"
                  onClick={() => navigate(LOGIN_ROUTE)}
                >
                  <FaSignInAlt size={20} /> {/* Иконка входа */}
                  </Button>
                <Button
                  variant="outline-light"
                  onClick={() => navigate(REGISTRATION_ROUTE)}
                >
                  <FaUserPlus size={20} /> {/* Иконка регистрации */}
                  </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
