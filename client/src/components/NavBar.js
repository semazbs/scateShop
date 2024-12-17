import React, { useContext } from "react";
import { Context } from "../index";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { SHOP_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaUserPlus, FaSignOutAlt, FaUserShield } from "react-icons/fa";
import './NavBar.css'

const NavBar = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem("token");
    navigate(SHOP_ROUTE);
  };

  return (
    <Navbar className="custom-navbar shadow-sm" expand="lg">
      <Container>
        <Navbar.Brand
          as={NavLink}
          to={SHOP_ROUTE}
          title="Главная"
          className="fw-bold fs-4"
        >
          🛹 SkateShop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {user.isAuth ? (
              <>
                <Button
                  variant="outline-dark"
                  className="me-2 rounded-pill"
                  onClick={() => navigate("/admin")}
                >
                  <FaUserShield size={20} className="me-1" />
                  Админ
                </Button>

                <Button
                  variant="danger"
                  className="rounded-pill"
                  onClick={logOut}
                >
                  <FaSignOutAlt size={20} className="me-1" />
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline-primary"
                  className="me-2 rounded-pill"
                  onClick={() => navigate(LOGIN_ROUTE)}
                >
                  <FaSignInAlt size={20} className="me-1" />
                  Войти
                </Button>

                <Button
                  variant="primary"
                  className="rounded-pill"
                  onClick={() => navigate(REGISTRATION_ROUTE)}
                >
                  <FaUserPlus size={20} className="me-1" />
                  Регистрация
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
