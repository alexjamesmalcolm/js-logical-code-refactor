import { getEveryScenario, Scenario } from "./getEveryScenario";

describe("getEveryScenario", () => {
  it("should create two scenarios for one variable", () => {
    const input = ["a"];
    const expectedOutcome: Scenario[] = [
      [{ name: "a", value: false }],
      [{ name: "a", value: true }],
    ];
    const result = getEveryScenario(input);
    expect(result).toStrictEqual(expectedOutcome);
  });
  it("should create four scenarios for two variables", () => {
    const input = ["a", "b"];
    const expectedOutcome: Scenario[] = [
      [
        { name: "a", value: false },
        { name: "b", value: false },
      ],
      [
        { name: "a", value: false },
        { name: "b", value: true },
      ],
      [
        { name: "a", value: true },
        { name: "b", value: false },
      ],
      [
        { name: "a", value: true },
        { name: "b", value: true },
      ],
    ];
    const result = getEveryScenario(input);
    expect(result).toStrictEqual(expectedOutcome);
  });
});
