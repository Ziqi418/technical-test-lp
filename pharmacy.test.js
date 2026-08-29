import { Drug, Pharmacy } from "./pharmacy";

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

    expect(pharmacy.updateBenefitValue()).toEqual([new Drug("Herbal Tea", -1, 50)]);
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

    expect(updateForDays(pharmacy, 3)).toEqual([new Drug("Magic Pill", 15, 40)]);
  });
});
