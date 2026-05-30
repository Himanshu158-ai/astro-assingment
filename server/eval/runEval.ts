import tests from "./golden-set.json" with { type: "json" };
import { routerNode } from "../src/graph/nodes/router.node.js";

let passed = 0;
let failed = 0;

for (const test of tests) {

    const result = await routerNode({
        message: test.message
    } as any);

    const actualIntent = result.intent;

    const isPass =
        actualIntent === test.expectedIntent;

    console.log(
        `${isPass ? "PASS" : "FAIL"} | ${test.name}`
    );

    console.log(
        "Expected:",
        test.expectedIntent
    );

    console.log(
        "Actual:",
        actualIntent
    );

    if (isPass) passed++;
    else failed++;
}

console.log("\n================");
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(
    `Accuracy: ${(
        (passed / tests.length) * 100
    ).toFixed(2)}%`
);