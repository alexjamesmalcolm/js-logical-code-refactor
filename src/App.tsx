import { useCallback, useState } from "react";
import { exampleCode } from "./example-code";
import useVariablesFromInput from "./useVariablesFromInput";

const App = (): JSX.Element => {
  const [input, setInput] = useState(exampleCode);
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value);
    },
    []
  );
  const variables = useVariablesFromInput(input);
  return (
    <div>
      <textarea onChange={handleChange} value={input} />
      <div>
        <h2>Input</h2>
        <code>{input}</code>
      </div>
      <div>
        <h2>Variables</h2>
        <p>
          Truth table row count (2<sup>{variables.length}</sup> ={" "}
          {Math.pow(2, variables.length)})
        </p>
        <code>{JSON.stringify(variables, null, 2)}</code>
      </div>
    </div>
  );
};

export default App;
