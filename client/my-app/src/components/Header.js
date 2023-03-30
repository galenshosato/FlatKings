import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function Header({userStatus}) {
  
  function handleLinkCLick (event) {
    event.preventDefault();
  };


  
    return (
      
<>
    <Navbar bg="dark" variant="dark">
        <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto"
          style={{ maxHeight: "100px" }}
          navbarScroll>
            <Nav.Link href="/" onClick={handleLinkCLick}>Today's Games</Nav.Link>
            <Nav.Link href={`/user/${userStatus.id}`} onClick={handleLinkCLick}>Your Bets</Nav.Link>
            {!userStatus.email ? <Nav.Link href="/login">Login</Nav.Link> : <Nav.Link>You are logged in as: {userStatus.email}</Nav.Link>}
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <div class="container">
    <div class="wrapper">
    <div class="bg">FlatKings</div>
    <div class="fg">FlatKings</div>
        <h3 style={{'text-align': 'center'}}>
            <em style={{color: 'white'}}>The official sports betting website of Flatiron School</em>
        </h3>
    </div>
</div>  
      </>
    )
}
export default Header;

