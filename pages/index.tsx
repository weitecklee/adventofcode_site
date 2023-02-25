import Link from 'next/link'
import { Accordion } from 'react-bootstrap'

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
    <Accordion>
      {years.map((year) => (
        <Accordion.Item key={year} eventKey={year}>
          <Accordion.Header>
            {year}
          </Accordion.Header>
          {days.map((day) => (
            <Accordion.Body key={day}>
              <Link href={`/${year}/${day}`}>
                {day}
              </Link>
            </Accordion.Body>
          ))}
        </Accordion.Item>
      ))}
    </Accordion>
  </>)
}

export default HomePage