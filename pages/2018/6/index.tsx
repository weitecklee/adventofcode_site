import React, { useState } from 'react';
import solver from './solver';
import testInput from './testInput';

function Page() {
  const [inputAOC, setInputAOC] = useState(testInput);
  const [outputAOC, setOutputAOC] = useState(['']);

  return (<>
    <textarea rows={30} cols={100} placeholder="Enter your input" onChange={(e) => setInputAOC(e.target.value)} defaultValue={testInput} />
    <br />
    <button onClick={() => {
      setOutputAOC(solver(inputAOC))
    }}>Solve it!</button>
    {outputAOC.map((text, i) => <div key={i}>{text}</div>)}
  </>)
}

export default Page