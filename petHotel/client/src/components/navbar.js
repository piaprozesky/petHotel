import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

function NavBar(props) {
  const logout = props.logout;
  return (
    <div>
      <Navbar className="navBg" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Pet Hotel
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/accommodationView">
                Hosts
              </Nav.Link>

              <li>
                <Nav.Link as={Link} to="/about">
                  About
                </Nav.Link>
              </li>

              {props.user ? (
                <ul className="navbar-nav">
                  <li>
                    <Nav.Link as={Link} to={`/users/${props.user.userID}`}>
                      Profile
                    </Nav.Link>
                  </li>

                  <li className="nav-item">
                    {/* Log out user. Then go to home page. */}
                    <NavLink
                      className="nav-link text-end"
                      to="/"
                      onClick={props.logout}
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              ) : (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                </ul>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section></section>
    </div>
  );
}
export default NavBar;
