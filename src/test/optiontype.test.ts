import "chai/register-should";
import {typeHaveExtra, OptionType} from "../optiontype";

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

describe("optiontype", function() {
  describe("typeHaveExtra()", function() {
    it("Check valid results", function() {
      for (const typeName of allTypes) {
        typeHaveExtra(typeName)
          .should.equal(truthTable[typeName]);
      }
    });
    it("Throw on invalid value", function() {
      (
        (): boolean => typeHaveExtra("obviousinvalidtype" as OptionType)
      ).should.throw();
    });
  });
});
