import "chai/register-should";
import readFromPackage from "../package";

const packageData = {
  stringOpt: "test",
  numberOpt: 34,
  arrayOpt: ["val1", "val2"],
  boolOpt: true,
};

const moveToTestDir = (testDir: string): void =>
  process.chdir(`testdata/${testDir}`);

describe("readFromPackage()", function() {
  let initialCwd: string;
  before(function() {
    initialCwd = process.cwd();
  });
  beforeEach(function() {
    process.chdir(initialCwd);
  });
  after(function() {
    process.chdir(initialCwd);
  });
  it("Get expected values from package.json", async function() {
    moveToTestDir("havevalue");
    const readData = await readFromPackage("testPkg");
    readData.should.eql(packageData);
  });
  it("Get empty if section is missing", async function() {
    moveToTestDir("nothavevalue");
    const readData = await readFromPackage("testPkg");
    readData.should.eql({});
  });
  it("Get empty if file does not exist", async function() {
    moveToTestDir("nofile");
    const readData = await readFromPackage("testPkg");
    readData.should.eql({});
  });
});
