/* eslint-env detox/detox, jest */

const launchArgs = {
  string: 'foo',
  bool: true,
};

const {stringifyPair} = require('../stringifyPair');

describe('Launch arguments', function () {
  beforeAll(() => device.launchApp({launchArgs}));

  it('should be provided and parsed', async () => {
    for (const key in launchArgs) {
      const value = launchArgs[key];
      await expect(element(by.text(stringifyPair(key, value)))).toExist();
    }
  });
});
