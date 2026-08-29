const MAX_BENEFIT = 50;

function updateFervex(drug) {
  if (drug.expiresIn <= 0) {
    return 0;
  }

  if (drug.expiresIn <= 5) {
    return drug.benefit + 3;
  }

  if (drug.expiresIn <= 10) {
    return drug.benefit + 2;
  }

  return drug.benefit + 1;
}

function updateStandardDrug(drug) {
  const benefitDecrease = drug.expiresIn <= 0 ? 2 : 1;
  return drug.benefit - benefitDecrease;
}

function updateDafalgan(drug) {
  const benefitDecrease = drug.expiresIn <= 0 ? 4 : 2;
  return drug.benefit - benefitDecrease;
}

function updateHerbalTea(drug) {
  const benefitIncrease = drug.expiresIn <= 0 ? 2 : 1;
  return drug.benefit + benefitIncrease;
}

function updateDrug(drug) {
  if (drug.name === "Magic Pill") {
    return;
  }

  let nextBenefit;

  if (drug.name === "Herbal Tea") {
    nextBenefit = updateHerbalTea(drug);
  } else if (drug.name === "Fervex") {
    nextBenefit = updateFervex(drug);
  } else if (drug.name === "Dafalgan") {
    nextBenefit = updateDafalgan(drug);
  } else {
    nextBenefit = updateStandardDrug(drug);
  }

  drug.benefit = Math.max(0, Math.min(MAX_BENEFIT, nextBenefit));
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
