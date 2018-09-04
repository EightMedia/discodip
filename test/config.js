const test = require("ava");
const rimraf = require("rimraf");
const build = require("../index");

const OUTPUT = "test/tmp/config/";

rimraf.sync(OUTPUT);

test("options.output is required", t => {
  const error = t.throws(() => {
    build({
      silent: true
    });
  }, Error);
  t.is(error.message, "options.output is required");
});

test("options.components is required", t => {
  const error = t.throws(() => {
    build({
      silent: true,
      output: OUTPUT
    });
  }, Error);
  t.is(error.message, "options.components is required");
});

test("error parsing components JSON", t => {
  const error = t.throws(() => {
    build({
      silent: true,
      output: OUTPUT,
      components: "test/fixtures/components-err.json"
    });
  }, Error);
  t.is(error.message, "Error parsing JSON test/fixtures/components-err.json");
});

test("complete", async t => {
  return new Promise((resolve, reject) => {
    build({
      silent: true,
      output: OUTPUT,
      components: "test/fixtures/components.json",
      componentHeadHtml: "<style>body{background:red}</style>",
      componentBodyHtml: "<script>//hello</script>",
      onComplete: () => {
        t.pass();
        resolve();
      }
    });
  });
});