/* eslint-disable no-new-func */
import { useCallback, useEffect, useState } from "react";
import { getEveryScenario } from "./getEveryScenario";
import useCodeExecution from "./useCodeExecution";

const useVariablesFromInput = (input: string): string[] => {
  const [variables, setVariables] = useState<string[]>([]);
  const codeExecution = useCodeExecution(input);
  const executeCodeWithEveryCombinationOfVariables = useCallback(
    (variables: string[]) => {
      if (variables.length === 0) {
        codeExecution([]);
      }
      const scenarios = getEveryScenario(variables);
      scenarios.forEach(codeExecution);
    },
    [codeExecution]
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
