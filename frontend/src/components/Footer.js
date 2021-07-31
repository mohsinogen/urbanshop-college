import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <h4>
              Follow me on{" "}
              <a href="https://github.com/mohsinogen">
                <i className="fab fa-github"></i>
              </a>{" "}
              <a href="https://www.instagram.com/mohsinogen.dev/">
                <i className="fab fa-instagram"></i>
              </a>{" "}
              <a href="https://www.linkedin.com/in/mohsin-ansari-3402231a8/">
                <i className="fab fa-linkedin"></i>
              </a>
            </h4>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3">Copyright &copy; Urbanshop</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
