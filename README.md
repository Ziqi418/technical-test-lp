# LegalPlace Take-Home Test Specification

You are a new developer in the Falcon team, and your first job is to add a feature to an old existing piece of code.

## System specifications

Hi and welcome to the team. We are in the future, and Falcon has extended its activities by opening a pharmacy. Your task is to add a new feature to our system so that we can begin distributing a new drug. First an introduction to our system:

- All drugs have an `expiresIn` value which denotes the number of days we have until the item expires.
- All drugs have a `benefit` value which denotes how powerful the drug is.
- At the end of each day our system lowers both values for every drug

But there is more:

- Once the expiration date has passed, Benefit degrades twice as fast.
- The Benefit of an item is never negative.
- "Herbal Tea" actually increases in Benefit the older it gets. Benefit increases twice as fast after the expiration date.
- The Benefit of an item is never more than 50.
- "Magic Pill" never expires nor decreases in Benefit.
- "Fervex", like Herbal Tea, increases in Benefit as its expiration date approaches. Benefit increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but Benefit drops to 0 after the expiration date.

We have recently signed a supplier of "Dafalgan". This requires an update to our system:

- "Dafalgan" degrades in Benefit twice as fast as normal drugs.

## Instructions

- [ ] Create a clone from this repository
- [ ] Implement the required feature
- [ ] Push the clone to your own repository when satisfied
- [ ] Send us the link and tell us approximatively how much time you spent on this assignment

You are encouraged to refactor the existing code before adding your own, as you would do if this was a real task in real life. We strongly recommend that you write tests to help you during this process.

Feel free to make any changes to the `updateBenefitValue` method implementation and add any new code as long as everything still works correctly. However, do not break the public API of the `Drug` and `Pharmacy` classes, as those are used by other pieces of the software (you can add new methods though).

Please commit as frequently as possible to make the review easier.

We expect you to spend no more than 2 hours on this assignment. We value the quality of the end result, not how much time you have spent on it.

## Test

To make sure that you will not break anything in the existing code, we added the result of the simulation in the _output.json_ file. Make sure that your code is able to generate a file with identical content. You can generate a new file by running the following command:

```sh
yarn start
```

## Implementation notes

The pharmacy update logic was refactored to make each drug rule explicit and
easier to maintain.

### Supported rules

- Standard drugs lose 1 Benefit per day, or 2 after expiration.
- Herbal Tea gains 1 Benefit per day, or 2 after expiration.
- Fervex gains 1 Benefit when more than 10 days remain, 2 when 10 days or
  fewer remain, and 3 when 5 days or fewer remain. Its Benefit drops to 0
  after expiration.
- Magic Pill never changes.
- Dafalgan loses Benefit twice as fast as a standard drug: 2 per day before
  expiration and 4 per day after expiration.

Benefit is constrained to the range from 0 to 50 in one central place.

### Tests and output fixtures

The test suite covers the main rules, boundary conditions, and multi-day
updates.

- `output-ref-v1.json` is the original 30-day simulation, before Dafalgan was
  added.
- `output-ref-v2.json` is the 30-day simulation including Dafalgan.
- `dafalgan-output-ref.json` is a focused fixture that checks Dafalgan across
  its expiration boundary.

### Commands

```sh
yarn lint
yarn test
yarn start
```

`yarn start` generates `output.json`. Compare it with `output-ref-v2.json` to
validate the current full simulation.
