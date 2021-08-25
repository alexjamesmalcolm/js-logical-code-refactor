/* eslint-disable no-new-func */
import { useCallback } from "react";
import { Scenario } from "./getEveryScenario";

const useCodeExecution = (input: string) =>
  useCallback(
    (scenario: Scenario) => {
      const codeToExecute = `"use strict";\n${scenario
        .map(({ name, value }) => `let ${name} = ${value};`)
        .join("\n")}${input}`;
      console.log("codeToExecute", codeToExecute);
      return new Function(codeToExecute)();
    },
    [input]
  );

export default useCodeExecution;
