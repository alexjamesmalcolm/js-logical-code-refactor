/* eslint-disable no-new-func */
import { useCallback, useEffect, useState } from "react";
import { getEveryScenario } from "./getEveryScenario";

const useVariablesFromInput = (input: string): string[] => {
  const [variables, setVariables] = useState<string[]>([]);
  const executeCodeWithEveryCombinationOfVariables = useCallback(
    (variables: string[]) => {
      if (variables.length === 0) {
        const codeToExecute = `"use strict";\n${input}`;
        console.log("codeToExecute", codeToExecute);
        new Function(codeToExecute)();
      }
      const scenarios = getEveryScenario(variables);
      scenarios.forEach((scenario) => {
        const codeToExecute = `"use strict";\n${scenario
          .map(({ name, value }) => `let ${name} = ${value};`)
          .join("\n")}${input}`;
        console.log("codeToExecute", codeToExecute);
        new Function(codeToExecute)();
      });
    },
    [input]
  );
  const findAllVariables: (variables?: string[]) => string[] = useCallback(
    (variables: string[] = []) => {
      console.log("RUN", variables);
      try {
        executeCodeWithEveryCombinationOfVariables(variables);
        return variables;
      } catch (error) {
        if (error.message.includes(" is not defined")) {
          const variableName = error.message.split(" is not defined")[0];
          return findAllVariables([...variables, variableName]);
        } else {
          throw error;
        }
      }
    },
    [executeCodeWithEveryCombinationOfVariables]
  );
  useEffect(() => {
    const variables = findAllVariables();
    setVariables(variables);
  }, [findAllVariables]);
  return variables;
};

export default useVariablesFromInput;
