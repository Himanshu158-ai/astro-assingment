import tests from "./e2e-test.json" with { type: "json" };
import { astroGraph } from "../src/graph/astroGraph.js";

const TEST_USER_ID = "USER_ID_REMOVED_BY_ME_SO_THAT_U_CAN_REPLACE_IT_WITH_YOUR_USER_ID";

async function run() {
  let passed = 0;

  for (const test of tests) {
    try {
      const result = await astroGraph.invoke({
        userId: TEST_USER_ID,
        message: test.message,
      });

      console.log("\n=================");
      console.log(test.name);
      console.log("=================");
      console.log(result.response);

      if (result.response) {
        passed++;
      }

    } catch (error) {
      console.error("FAIL:", test.name);
    }
  }

  console.log(`\nPassed: ${passed}/${tests.length}`);
}

run();