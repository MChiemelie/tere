const fs = require("fs");
const path = require("path");

function fail(msg) {
  console.error("ERROR:", msg);
  process.exitCode = 1;
}

function ok(msg) {
  console.log("OK:", msg);
}

// Check that index.html exists
const indexPath = path.join(__dirname, "..", "src", "index.html");
if (!fs.existsSync(indexPath)) fail("src/index.html not found");
else ok("src/index.html exists");

// Check that src/output.css was generated
const outCss = path.join(__dirname, "..", "src", "output.css");
if (!fs.existsSync(outCss)) fail("src/output.css not found - ensure build ran");
else ok("src/output.css exists");

// Basic HTML sanity: ensure <link href="./output.css" exists inside src/index.html
const index = fs.readFileSync(indexPath, "utf8");
if (!/link[^>]+href=["']\.\/output\.css["']/.test(index))
  fail("src/index.html does not link ./output.css");
else ok("src/index.html links output.css");

if (process.exitCode === 1) {
  console.error("\nOne or more checks failed.");
} else {
  console.log("\nAll checks passed.");
}
