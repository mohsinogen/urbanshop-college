import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Badge, Container } from "react-bootstrap";
import { logout } from "../actions/userActions";
import "./MobileNavbar.css";

const MobileNavbar = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div>
      <Navbar
        className="d-flex mobileNavbar"
        bg="light"
        variant="light"
        fixed="bottom"
      >
        <Container className="wrapper">
          <LinkContainer to="/">
            <Navbar.Brand>
              <i className="fas fa-home"></i>
            </Navbar.Brand>
          </LinkContainer>
          <LinkContainer to="/cart">
            <Nav.Link active>
              <i className="fas fa-shopping-bag"></i>
              <sup>
                <Badge
                  pill
                  bg="dark"
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  {cartItems.length}
                </Badge>
              </sup>
            </Nav.Link>
          </LinkContainer>
          {userInfo ? (
            <>
              <LinkContainer to="/profile">
                <Nav.Link>
                  <i className="fas fa-user"></i>
                </Nav.Link>
              </LinkContainer>
              <Nav.Item style={{ display: "contents" }} onClick={logoutHandler}>
                <Nav.Link>
                  <i className="fas fa-sign-out-alt"></i>
                </Nav.Link>
              </Nav.Item>
            </>
          ) : (
            <LinkContainer to="/login">
              <Nav.Link>
                <i className="fas fa-user"></i>
              </Nav.Link>
            </LinkContainer>
          )}
        </Container>
      </Navbar>
    </div>
  );
};

export default MobileNavbar;
