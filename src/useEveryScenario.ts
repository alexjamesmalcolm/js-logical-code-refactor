import { useMemo } from "react";
import { getEveryScenario } from "./getEveryScenario";

const useEveryScenario = (variables: string[]) =>
  useMemo(() => getEveryScenario(variables), [variables]);

export default useEveryScenario;
