import Link from 'next/link';
import React, { useState } from 'react';
import solver from './solver';

function Page() {
  const [inputAOC, setInputAOC] = useState('');
  const [outputAOC, setOutputAOC] = useState(['']);

  return (<>
    <textarea rows={30} cols={100} placeholder="Enter your input" onChange={(e) => setInputAOC(e.target.value)} />
    <br />
    <button onClick={() => {
      setOutputAOC(solver(inputAOC))
    }}>Solve it!</button>
    {outputAOC.map((text, i) => <div key={i}>{text}</div>)}
    <Link href="/">Go back!</Link>
  </>)
}

export default Page