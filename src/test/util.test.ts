import "chai/register-should";
import {camelToKebab} from "../util";

interface TestCase {
  camel: string;
  kebab: string;
}

type TestCases = Array<TestCase>;

// No all-caps word, no numbers, all words start with a cap
const simpleCases: TestCases = [
  {
    camel: "SomeTestString",
    kebab: "some-test-string",
  },
  {
    camel: "TwoWords",
    kebab: "two-words",
  },
  {
    camel: "Single",
    kebab: "single",
  },
];

const withNumbers: TestCases = [
  {
    camel: "DigitInLast3",
    kebab: "digit-in-last3",
  },
  {
    camel: "DigitInLastButBig345",
    kebab: "digit-in-last-but-big345",
  },
  {
    camel: "Digit63In34Multiple1PlacesButBig345",
    kebab: "digit63-in34-multiple1-places-but-big345",
  },
  {
    camel: "55digitStart",
    kebab: "55digit-start",
  },
  {
    camel: "DigitIn55Middle",
    kebab: "digit-in55-middle",
  },
];

const withFullCaps: TestCases = [
  {
    camel: "ABCAtTheStart",
    kebab: "abc-at-the-start",
  },
  {
    camel: "AtTheATMMiddle",
    kebab: "at-the-atm-middle",
  },
  {
    camel: "AtEndIsAEIA",
    kebab: "at-end-is-aeia",
  },
  {
    camel: "ATGCMultipleAcronymMAIASInTheString",
    kebab: "atgc-multiple-acronym-maias-in-the-string",
  },
  {
    camel: "ABCDAllCasesATGCAtOnceCDEFInALongStringUIOP",
    kebab: "abcd-all-cases-atgc-at-once-cdef-in-a-long-string-uiop",
  },
];

const withFullCapsAndNumbers: TestCases = [
  {
    camel: "ABCAtTheStart88",
    kebab: "abc-at-the-start88",
  },
  {
    camel: "AtThe33ATMMiddle",
    kebab: "at-the33-atm-middle",
  },
  {
    camel: "AtEndIsAEIA",
    kebab: "at-end-is-aeia",
  },
  {
    camel: "ATGCMultiple27AcronymMAIASInTheString",
    kebab: "atgc-multiple27-acronym-maias-in-the-string",
  },
  {
    camel: "ABCD34AllCases5ATGC6AtOnceCDEFIn12ALongStringUI34OP",
    kebab: "abcd34-all-cases5-atgc6-at-once-cdef-in12-a-long-string-ui34-op",
  },
];

const allTestCases: TestCases = [
  ...simpleCases,
  ...withNumbers,
  ...withFullCaps,
  ...withFullCapsAndNumbers,
];

const firstLetterLowerCase = (testList: TestCases): TestCases =>
  testList.map(testElem => {
    if (testElem.camel.length == 0) {
      return {
        camel: testElem.camel,
        kebab: testElem.kebab,
      };
    }
    return {
      camel: `${testElem.camel[0].toLowerCase()}${testElem.camel.substr(1)}`,
      kebab: testElem.kebab,
    };
  });

const runTestCase = (testList: TestCases): void =>
  testList.forEach(
    testElem => camelToKebab(testElem.camel).should.equal(testElem.kebab)
  );

describe("util", function() {
  describe("camelToKebab()", function() {
    it("Support simple cases", function() {
      runTestCase(simpleCases);
    });
    it("Support numbers", function() {
      runTestCase(withNumbers);
    });
    it("Support with full caps", function() {
      runTestCase(withFullCaps);
    });
    it("Support with full caps and numbers", function() {
      runTestCase(withFullCapsAndNumbers);
    });
    it("Support starting with lowercase", function() {
      runTestCase(firstLetterLowerCase(allTestCases));
    });
    it("Support empty input", function() {
      camelToKebab("").should.equal("");
    });
  });
});
