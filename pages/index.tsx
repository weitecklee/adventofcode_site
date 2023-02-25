import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function HomePage() {
  const years = [];
  for (let i = 2015; i <= 2022; i++) {
    years.push(i);
  };

  const days = [];
  for (let i = 1; i <= 25; i++) {
    days.push(i);
  };

  return (<>
    <div>Advent of Code Solvers (for some days)</div>
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle  aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          {years.map((year) => (
            <NavDropdown key={year} title={year} id={year}>
              {days.map((day) => (
                <NavDropdown.Item key={day} href={`/${year}/${day}`}>
                  {day}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </>)
}

export default HomePage