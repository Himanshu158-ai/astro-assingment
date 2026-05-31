# AstroAgent – Agentic AI Astrology Companion

AstroAgent is a conversational astrology companion built as part of the Aradhana Full-Stack Builder Take-Home Assignment.

The project combines an agent-based backend built with LangGraph and a modern React frontend to provide personalized astrological guidance using real birth chart data and tool-driven reasoning.

---

## Features

### Agentic Backend

Built using LangGraph with:

* Stateful agent workflow
* Intent routing
* Tool calling
* Conditional graph execution
* Structured reasoning flow

### Tools Implemented

#### 1. compute_birth_chart()

Generates a user's natal chart using real astrological calculations.

Returns:

* Planetary positions
* Houses
* Ascendant information
* Core chart metadata

#### 2. geocode_place()

Converts a place name into:

* Latitude
* Longitude
* Timezone information

Used to support accurate birth chart calculations.

#### 3. knowledge_lookup()

Retrieves astrology knowledge from a curated knowledge base.

Used for:

* Astrology concepts
* Sign meanings
* Planet explanations
* House interpretations
* Educational queries

---

## Frontend

Built using:

* React
* Tailwind CSS
* React Router

Features:

* Birth details registration flow
* Responsive chat interface
* Real-time streaming responses
* Loading states
* Error handling
* Protected routes
* Conversation experience inspired by modern AI assistants

---

## Real-Time Tool Visibility

Server-Sent Events (SSE) are used to stream agent activity to the frontend.

Users can see:

* When a tool is being called
* Which tool is currently executing
* Streaming AI responses
* Agent progress in real time

Example:

Computing birth chart...

Looking up astrology knowledge...

Generating response...

This improves transparency and user trust.

---

## Architecture

User Message
↓
Router Node
↓
Intent Classification
↓
Conditional Routing
↓
Tool Execution
↓
Reasoning Node
↓
Final Response

### Supported Intents

* birth_chart
* knowledge_lookup
* chat

---

## Evaluation Strategy

The evaluation process was treated as a first-class deliverable.

### Router Evaluation

A versioned golden dataset containing 30 representative prompts was created.

Categories included:

* Greetings
* Birth chart requests
* Astrology knowledge queries
* Career questions
* Relationship questions
* Off-topic prompts
* Safety-sensitive prompts
* Invalid input scenarios

### Results

Total Cases: 30

Passed: 28

Failed: 2

Router Accuracy: 93.33%

---

## Tool Testing

Individual tool validation was performed for:

### compute_birth_chart

Verified:

* Correct chart generation
* Birth detail validation
* Error handling

### geocode_place

Verified:

* Location lookup
* Invalid location handling

### knowledge_lookup

Verified:

* Retrieval quality
* Response consistency

---

## End-to-End Testing

Complete workflow testing was performed covering:

1. User registration
2. Birth chart generation
3. Tool invocation
4. Knowledge lookup
5. Response generation
6. Streaming delivery

All primary user flows completed successfully.

---

## Safety Guardrails

The assistant does not provide:

* Medical diagnoses
* Financial certainty
* Legal certainty

Astrology responses are presented as guidance and reflection rather than factual prediction.

Prompt-injection attempts are handled safely through routing and response constraints.

---

## Tech Stack

### Backend

* Node.js
* Express
* LangGraph
* Cohere
* SSE

### Frontend

* React
* Tailwind CSS
* React Router

### Evaluation

* Custom evaluation harness
* Golden dataset
* Automated router testing
* Tool testing
* End-to-end testing

---

## Project Structure

server/
├── graph/
├── nodes/
├── tools/
├── routes/
├── evaluations/

client/
├── pages/
├── components/
├── services/
├── hooks/

---

## Running Locally

### Backend

npm install

npm run dev

### Frontend

npm install

npm run dev

---

## Known Limitations

* Daily transit calculations are not currently implemented.
* Conversation memory is session-scoped.
* Knowledge base size is intentionally small for evaluation purposes.

---

## Future Improvements

* Daily transit tool integration
* Long-term memory
* Expanded astrology knowledge base
* Tool result caching
* Multi-agent workflow
* Personalized recommendations

---

## Reflection

A major focus of this project was building a transparent and testable agent rather than relying solely on model-generated responses.

The combination of:

* LangGraph routing
* Tool-driven reasoning
* Real-time streaming
* Evaluation-driven development

resulted in a system that is both observable and measurable.

Given additional time, the next priority would be implementing real-time transit analysis and expanding evaluation coverage further.
