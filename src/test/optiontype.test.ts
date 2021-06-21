import "chai/register-should.js";
import {typeHaveExtra, OptionType} from "../optiontype.js";

const allTypes = [
  OptionType.STRING,
  OptionType.NUMBER,
  OptionType.BOOLEAN,
];

const truthTable: Record<OptionType, boolean> = {
  [OptionType.STRING]: true,
  [OptionType.NUMBER]: true,
  [OptionType.BOOLEAN]: false,
};

describe("optiontype", () => {
  describe("typeHaveExtra()", () => {
    it("Check valid results", () => {
      for (const typeName of allTypes) {
        typeHaveExtra(typeName)
          .should.equal(truthTable[typeName]);
      }
    });
  });
});
