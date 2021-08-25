import { useCallback, useState } from "react";
import { exampleCode } from "./example-code";
import useCodeExecution from "./useCodeExecution";
import useEveryScenario from "./useEveryScenario";
import useVariablesFromInput from "./useVariablesFromInput";
import styles from "./App.module.css";

const App = (): JSX.Element => {
  const [input, setInput] = useState(exampleCode);
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value);
    },
    []
  );
  const variables = useVariablesFromInput(input);
  const scenarios = useEveryScenario(variables);
  const codeExecution = useCodeExecution(input);
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
      <div>
        <h2>Truth Table</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              {variables.map((variable) => (
                <th key={variable}>{variable}</th>
              ))}
              <th>Output</th>
            </tr>
          </thead>
          <tbody>
            {scenarios.map((scenario) => {
              const key = scenario
                .map(({ name, value }) => `${name}:${value}`)
                .join(";");
              return (
                <tr key={key}>
                  {scenario.map(({ name, value }) => (
                    <td key={name}>{value.toString()}</td>
                  ))}
                  <td>{codeExecution(scenario).toString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
