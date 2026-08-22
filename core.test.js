const assert = require('assert');
const Tool = require('./core');

(async function () {
  const out = Tool.clean('api-key=abc\nDEBUG=true\nAPI_KEY=def');
  assert.strictEqual(out, 'API_KEY=replace_me\nDEBUG=true\n');
  assert.ok(!out.includes('abc') && !out.includes('def'));
  console.log('ok, tool assertions passed');
})().catch(function (error) {
  console.error(error);
  process.exitCode = 1;
});
