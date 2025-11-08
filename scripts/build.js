const fs = require("fs");
const { execSync } = require("child_process");
const path = require("path");

const input = path.join(__dirname, "..", "src", "input.css");
const output = path.join(__dirname, "..", "src", "output.css");

try {
  console.log("Attempting to run tailwind via npx...");
  execSync(`npx tailwindcss -i "${input}" -o "${output}" --minify`, {
    stdio: "inherit",
  });
  console.log("Built output.css with tailwind.");
} catch (err) {
  console.warn(
    "Tailwind build failed or npx not available. Falling back to copying src/input.css to src/output.css."
  );
  try {
    fs.copyFileSync(input, output);
    console.log("Copied src/input.css -> src/output.css");
  } catch (copyErr) {
    console.error("Failed to generate output.css:", copyErr.message);
    process.exitCode = 1;
  }
}
