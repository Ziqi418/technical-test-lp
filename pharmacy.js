const MAX_BENEFIT = 50;

function clampBenefit(benefit) {
  return Math.max(0, Math.min(MAX_BENEFIT, benefit));
}

function updateFervex(drug) {
  if (drug.expiresIn <= 0) {
    drug.benefit = 0;
    return;
  }

  if (drug.expiresIn <= 5) {
    drug.benefit = clampBenefit(drug.benefit + 3);
    return;
  }

  if (drug.expiresIn <= 10) {
    drug.benefit = clampBenefit(drug.benefit + 2);
    return;
  }

  drug.benefit = clampBenefit(drug.benefit + 1);
}

function updateStandardDrug(drug) {
  const benefitDecrease = drug.expiresIn <= 0 ? 2 : 1;
  drug.benefit = clampBenefit(drug.benefit - benefitDecrease);
}

function updateDafalgan(drug) {
  const benefitDecrease = drug.expiresIn <= 0 ? 4 : 2;
  drug.benefit = clampBenefit(drug.benefit - benefitDecrease);
}

function updateHerbalTea(drug) {
  const benefitIncrease = drug.expiresIn <= 0 ? 2 : 1;
  drug.benefit = clampBenefit(drug.benefit + benefitIncrease);
}

function updateDrug(drug) {
  if (drug.name === "Magic Pill") {
    return;
  }

  if (drug.name === "Herbal Tea") {
    updateHerbalTea(drug);
  } else if (drug.name === "Fervex") {
    updateFervex(drug);
  } else if (drug.name === "Dafalgan") {
    updateDafalgan(drug);
  } else {
    updateStandardDrug(drug);
  }

  drug.expiresIn -= 1;
}

export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    for (const drug of this.drugs) {
      updateDrug(drug);
    }

    return this.drugs;
  }
}
