'use strict';

const {ApiConsoleBuilder} = require('../lib/builder');
const path = require('path');
const fs = require('fs-extra');
/**
 * TODO: This test doesn't work on darwin.
 */
describe('ApiConsoleBuilder', () => {
  const logger = {
    warn: function() {},
    info: function() {},
    log: function() {}
  };
  const sourcesDir = path.join('test', 'api-console-sources');
  const buildDir = 'build';
  const buildFullPath = path.join(sourcesDir, buildDir);
  const opts = {
    dest: 'playground/builder',
    mainFile: 'api-console.html',
    noOptimization: true
  };

  describe('buildPolymer()', () => {
    var builder;
    before(function() {
      return fs.remove(buildFullPath)
      .then(() => {
        builder = new ApiConsoleBuilder(opts, logger, sourcesDir, buildDir);
        process.chdir(sourcesDir);
        builder.setOptymisationConditions();
        builder.initializeBuilder();
      });
    });

    it('Should build the console', function() {
      this.timeout(300000);
      return builder.buildPolymer();
    });
  });
});
