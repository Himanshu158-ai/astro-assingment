# AstroAgent – Agentic AI Astrology Companion

AstroAgent is an AI-powered astrology companion built as part of the Aradhana Full-Stack Builder Take-Home Assignment.

The project combines a LangGraph-based agent backend with a React frontend to deliver personalized astrological guidance using real chart computation, tool-driven reasoning, and transparent agent execution.

---

# Demo

The application allows users to:

* Enter birth details
* Generate a natal chart
* Ask astrology-related questions
* Receive chart-based responses
* Observe tool execution in real time through Server-Sent Events (SSE)

---

# Architecture

The backend is implemented as a stateful LangGraph workflow.

## Agent Flow

```text
User Message
      │
      ▼
 ┌────────────┐
 │ RouterNode │
 └────────────┘
      │
      ▼
 Intent Classification
      │
 ┌────┴──────────┐
 │               │
 ▼               ▼

Birth Chart   Knowledge Lookup
Intent          Intent

 │               │
 ▼               ▼

Tools        Knowledge Tool

 └──────┬────────┘
        ▼

  Reasoning Node
        │
        ▼

 Final Response
```

---

# LangGraph Components

## Router Node

Responsible for classifying incoming user messages into supported intents.

Supported intents:

* birth_chart
* knowledge_lookup
* chat

Examples:

| User Query                 | Intent           |
| -------------------------- | ---------------- |
| Tell me about my moon sign | birth_chart      |
| What does ascendant mean?  | knowledge_lookup |
| Hello                      | chat             |

---

## Reasoning Node

Responsible for:

* Interpreting tool results
* Generating final responses
* Maintaining conversational flow
* Applying safety guardrails

---

# Tools Implemented

The assignment required implementation of at least three tools.

## 1. compute_birth_chart()

Generates a natal chart using real birth details.

Input:

* Date of Birth
* Time of Birth
* Place of Birth

Output:

* Planetary positions
* Ascendant
* Houses
* Chart metadata

---

## 2. geocode_place()

Converts a birth location into geographical coordinates.

Output:

* Latitude
* Longitude
* Timezone

Used to support accurate chart calculations.

---

## 3. knowledge_lookup()

Retrieves astrology knowledge from a curated knowledge base.

Examples:

* Ascendant meaning
* Zodiac explanations
* House interpretations
* Planetary symbolism

---

# Real-Time Streaming

The application uses Server-Sent Events (SSE).

This enables:

* Streaming responses
* Live tool execution updates
* Improved transparency

Example:

```text
Computing birth chart...
Looking up astrology knowledge...
Generating response...
```

Users can observe which tool is currently executing before the final response is delivered.

---

# Frontend

Built using:

* React
* Tailwind CSS
* React Router

Features:

### Registration Flow

Users provide:

* Full Name
* Birth Date
* Birth Time
* Birth Place

### Protected Chat Route

Users cannot access the chat experience without completing birth registration.

### Responsive Chat Experience

Supports:

* Desktop
* Tablet
* Mobile

### Streaming UI

Displays:

* Live responses
* Tool activity
* Loading states
* Error states

---

# Evaluation

Evaluation was treated as a core deliverable rather than a final-stage activity.

---

## Golden Dataset

A versioned golden dataset containing 30 representative prompts was created.

Categories included:

* Greetings
* Birth chart requests
* Astrology concepts
* Career guidance
* Relationship guidance
* Off-topic queries
* Prompt injection attempts
* Safety-sensitive prompts

---

## Router Evaluation

### Results

| Metric      | Value  |
| ----------- | ------ |
| Total Tests | 30     |
| Passed      | 28     |
| Failed      | 2      |
| Accuracy    | 93.33% |

The router successfully classified the majority of representative user queries.

---

## Tool Testing

Each tool was tested independently.

### Tested

* compute_birth_chart
* geocode_place
* knowledge_lookup

Validation covered:

* Successful execution
* Invalid inputs
* Error handling

---

## End-to-End Testing

Complete user workflows were tested.

### Covered Flows

1. Registration
2. Birth Chart Generation
3. Tool Invocation
4. Knowledge Lookup
5. Response Generation
6. Streaming Delivery

All primary user journeys completed successfully.

---

# Safety Guardrails

Astrology should be used for reflection and guidance.

The assistant does not provide:

* Medical diagnoses
* Financial certainty
* Legal certainty

Prompt injection attempts are safely handled through routing and response constraints.

---

# Tech Stack

## Backend

* Node.js
* Express.js
* LangGraph
* Cohere
* Server-Sent Events (SSE)

## Frontend

* React
* Tailwind CSS
* React Router

## Evaluation

* Golden Test Dataset
* Router Testing
* Tool Testing
* End-to-End Testing

---

# Project Structure

```text
astro-agent/

├── client/
│   ├── pages/
│   ├── components/
│   ├── services/
│   └── routes/
│
├── server/
│   ├── graph/
│   ├── nodes/
│   ├── tools/
│   ├── routes/
│   └── evaluations/
│
├── evaluation/
│   ├── golden-set.jsonl
│   ├── scorecard.md
│   └── results.json
│
├── README.md
└── EVALUATION.md
```

---

# Local Setup

## Backend

```bash
cd server
npm install
npm run dev
```

## Frontend

```bash
cd client
npm install
npm run dev
```

---

# Known Limitations

* Daily transit calculations are not currently implemented.
* Conversation memory is session-scoped.
* Knowledge base is intentionally small for evaluation purposes.
* Router classification still has a small number of edge-case failures.

---

# Future Improvements

* Daily transit tool integration
* Persistent memory
* Expanded astrology knowledge base
* Tool result caching
* Multi-agent workflow
* Advanced evaluation metrics

---

# Reflection

This project focused on building a transparent and testable AI agent rather than relying solely on model-generated responses.

Key priorities included:

* Tool-grounded reasoning
* Clear routing logic
* Real-time visibility into agent execution
* Evaluation-driven development

The combination of LangGraph, structured tools, SSE streaming, and automated evaluation produced a system that is observable, measurable, and extensible.
