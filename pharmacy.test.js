import { Drug, Pharmacy } from "./pharmacy";
import dafalganOutput from "./dafalgan-output-ref.json";
import outputV2 from "./output-ref-v2.json";

function updateForDays(pharmacy, days) {
  for (let day = 0; day < days; day += 1) {
    pharmacy.updateBenefitValue();
  }

  return pharmacy.drugs;
}

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)],
    );
  });

  it("degrades normal drugs twice as fast after they expire", () => {
    const pharmacy = new Pharmacy([new Drug("Doliprane", 1, 5)]);

    expect(updateForDays(pharmacy, 2)).toEqual([new Drug("Doliprane", -1, 2)]);
  });

  it("increases Herbal Tea without exceeding the maximum benefit", () => {
    const pharmacy = new Pharmacy([new Drug("Herbal Tea", 0, 48)]);

    expect(pharmacy.updateBenefitValue()).toEqual([
      new Drug("Herbal Tea", -1, 50),
    ]);
  });

  it("degrades Dafalgan twice as fast, including after it expires", () => {
    const pharmacy = new Pharmacy([new Drug("Dafalgan", 1, 10)]);

    expect(updateForDays(pharmacy, 2)).toEqual([new Drug("Dafalgan", -1, 4)]);
  });

  it("matches the Dafalgan output fixture over multiple days", () => {
    const pharmacy = new Pharmacy([new Drug("Dafalgan", 2, 10)]);
    const result = [];

    for (let day = 0; day < 4; day += 1) {
      result.push(JSON.parse(JSON.stringify(pharmacy.updateBenefitValue())));
    }

    expect(result).toEqual(dafalganOutput.result);
  });

  it("matches the 30-day output fixture with Dafalgan", () => {
    const pharmacy = new Pharmacy([
      new Drug("Doliprane", 20, 30),
      new Drug("Herbal Tea", 10, 5),
      new Drug("Fervex", 12, 35),
      new Drug("Magic Pill", 15, 40),
      new Drug("Dafalgan", 4, 20),
    ]);
    const result = [];

    for (let day = 0; day < 30; day += 1) {
      result.push(JSON.parse(JSON.stringify(pharmacy.updateBenefitValue())));
    }

    expect(result).toEqual(outputV2.result);
  });

  it.each([
    [11, 20, 10, 21],
    [10, 20, 9, 22],
    [5, 20, 4, 23],
    [0, 20, -1, 0],
  ])(
    "updates Fervex correctly when expiresIn is %i",
    (expiresIn, benefit, expectedExpiresIn, expectedBenefit) => {
      const pharmacy = new Pharmacy([new Drug("Fervex", expiresIn, benefit)]);

      expect(pharmacy.updateBenefitValue()).toEqual([
        new Drug("Fervex", expectedExpiresIn, expectedBenefit),
      ]);
    },
  );

  it("does not update Magic Pill", () => {
    const pharmacy = new Pharmacy([new Drug("Magic Pill", 15, 40)]);

    expect(updateForDays(pharmacy, 3)).toEqual([
      new Drug("Magic Pill", 15, 40),
    ]);
  });
});
