# Evaluation Harness

This project includes an evaluation harness to verify the reliability and correctness of the Astro Agent. The evaluation framework is designed to test the system at multiple levels, including intent routing, tool execution, and complete end-to-end user interactions.

## Evaluation Categories

### 1. Router Evaluation

The router evaluation validates whether user queries are classified into the correct intent before being processed by the graph.

Examples:

* "Tell me about my birth chart" → birth_chart
* "What does my ascendant mean?" → knowledge_lookup
* "Hello" → chat

Metrics:

* Total Tests: 10
* Passed: 9
* Accuracy: 90%

---

### 2. Tool Evaluation

Each tool is tested independently to ensure it returns valid outputs.

#### geocodePlace

Input:

* Place Name

Validation:

* Latitude exists
* Longitude exists

Status:

* PASS

#### computeBirthChart

Input:

* Birth Date
* Birth Time
* Coordinates

Validation:

* Sun Sign generated
* Moon Sign generated
* Ascendant generated

Status:

* PASS

#### knowledgeLookup

Input:

* Astrology Topic / Sign

Validation:

* Non-empty knowledge response returned

Status:

* PASS

Tool Accuracy:

* 100%

---

### 3. End-to-End Evaluation

The complete graph workflow is tested from user input to final response generation.

Flow:

User Query
→ Router Node
→ Tool Node (if required)
→ Chat Node
→ Final Response

Test Cases:

1. Greeting Query
2. Birth Chart Query
3. Ascendant Meaning Query
4. Off-topic Query
5. Financial Advice Query

Results:

* Passed: 5/5
* Accuracy: 100%

---

## Running Evaluations

Router Evaluation:

npm run eval

End-to-End Evaluation:

npm run eval:e2e

---

## Summary

| Evaluation Type       | Result |
| --------------------- | ------ |
| Router Evaluation     | PASS   |
| Tool Evaluation       | PASS   |
| End-to-End Evaluation | PASS   |

Overall System Status: PASS
