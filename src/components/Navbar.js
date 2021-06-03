import React from "react"
import { Navbar, Container } from "react-bootstrap"
import { Link } from "react-router-dom"

function NavBarComponent() {
  return (
    <Navbar variant="dark" bg="dark" expand="sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <h2 className="text-large">Firegram</h2>
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}
export default NavBarComponent
