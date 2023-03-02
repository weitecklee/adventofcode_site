import React, { useState } from 'react';
import solver from './solver';
import testInput from './defaultInput';
import reactStringReplace from 'react-string-replace';

function Page() {
  const [inputAOC, setInputAOC] = useState(testInput);
  const [outputAOC, setOutputAOC] = useState(['']);

  return (<>
    <textarea rows={30} cols={100} placeholder="Enter your input" onChange={(e) => setInputAOC(e.target.value)} defaultValue={testInput} />
    <br />
    <button onClick={() => {
      setOutputAOC(solver(inputAOC))
    }}>Solve it!</button>
    {outputAOC.map((text, i) => {
      if (i < 1) {
        return <div key={i}>{text}</div>;
      }
      return <div className="code" key={i}>{reactStringReplace(text, '1', (match) => <span className="highlight">{match}</span>)}</div>
    })}
  </>)
}

export default Page