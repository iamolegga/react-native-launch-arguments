const launchArgs = {
  string: "foo",
  bool: true,
};

const { stringifyPair } = require("../stringifyPair");

describe("Launch arguments", function () {
  this.timeout(1000 * 60 * 30); // for extra slow android emulator on ci

  before(async () => {
    await device.launchApp({ launchArgs });
  });

  it("should be provided and parsed", async () => {
    for (const key in launchArgs) {
      const value = launchArgs[key];
      await expect(element(by.text(stringifyPair(key, value)))).toExist();
    }
  });
});
