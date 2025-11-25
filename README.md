# PartSelect Chat Agent

A production-ready chat agent system for PartSelect e-commerce platform, specializing in refrigerator and dishwasher parts. This implementation demonstrates a complete RAG (Retrieval-Augmented Generation) architecture with a modern React frontend, Node.js backend, and DeepSeek API integration.

## Executive Summary

This case study presents a fully functional chat agent that assists customers with refrigerator and dishwasher parts inquiries. The system combines intelligent intent detection, product search, compatibility checking, troubleshooting guidance, and installation instructions within a clean, user-friendly interface.

**Key Capabilities:**
- Product search and recommendations
- Compatibility verification for specific appliance models
- Step-by-step troubleshooting guidance
- Detailed installation instructions
- Scope-restricted domain expertise (refrigerator and dishwasher parts only)

## Architecture Overview

### System Architecture

```
┌─────────────────────────────────────┐
│      React Frontend (Vite)          │
│  - Chat Interface                   │
│  - Product Cards                    │
│  - Message Threading                │
└──────────────┬──────────────────────┘
               │ HTTP/REST API
               ▼
┌─────────────────────────────────────┐
│    Express Backend (Node.js)        │
│  - Intent Detection                 │
│  - Scope Guardrails                 │
│  - RAG Pipeline                     │
│  - Product Service                  │
└──────────────┬──────────────────────┘
               │
       ┌───────┴───────┐
       │               │
       ▼               ▼
┌─────────────┐  ┌──────────────┐
│ DeepSeek    │  │ Product DB   │
│   API       │  │ + Knowledge  │
│             │  │    Base      │
└─────────────┘  └──────────────┘
```

### Technology Stack

**Frontend:**
- React 18 with functional components and hooks
- Vite for fast development and optimized builds
- Tailwind CSS for responsive, modern styling
- Axios for HTTP client communication

**Backend:**
- Node.js with Express framework
- DeepSeek API for LLM-powered responses
- Modular service architecture
- In-memory data storage (easily extensible to database)

## Project Structure

```
InstaLilyAI/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── ChatInterface.jsx
│   │   │   ├── MessageList.jsx
│   │   │   ├── Message.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── services/           # API client services
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/                     # Node.js backend API
│   ├── src/
│   │   ├── routes/              # Express route handlers
│   │   │   ├── chat.js
│   │   │   └── products.js
│   │   ├── services/            # Business logic layer
│   │   │   ├── chatAgent.js     # Main agent orchestration
│   │   │   ├── deepseekClient.js # DeepSeek API integration
│   │   │   ├── productService.js # Product search & compatibility
│   │   │   ├── knowledgeBase.js  # Knowledge retrieval
│   │   │   └── intentDetection.js # Intent classification
│   │   ├── data/                # Seed data
│   │   │   ├── products.js
│   │   │   └── knowledgeBase.js
│   │   └── server.js            # Express server setup
│   ├── package.json
│   └── .env.example            # Environment variable template
│
├── README.md                    # This file
├── SETUP.md                     # Detailed setup instructions
├── ARCHITECTURE.md              # Technical architecture details
├── EXAMPLE_QUERIES.md          # Test queries and examples
├── requirements.txt             # Dependency documentation
└── package.json                 # Root package configuration
```

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher
- DeepSeek API key ([Get one here](https://platform.deepseek.com/))

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd InstaLilyAI
   ```

2. **Install dependencies:**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend && npm install && cd ..
   
   # Install backend dependencies
   cd backend && npm install && cd ..
   ```

3. **Configure environment variables:**
   ```bash
   # Copy the example environment file
   cp backend/.env.example backend/.env
   
   # Edit backend/.env and add your DeepSeek API key
   # DEEPSEEK_API_KEY=your_actual_api_key_here
   # PORT=3001
   ```

4. **Start the development servers:**
   ```bash
   # Run both servers concurrently
   npm run dev
   
   # Or run separately:
   # Terminal 1: npm run dev:backend
   # Terminal 2: npm run dev:frontend
   ```

5. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Health Check: http://localhost:3001/health

## Core Features

### 1. Intent Detection

The system automatically classifies user queries into four primary intents:

- **Product Search**: Finding specific parts or components
- **Compatibility**: Verifying part compatibility with appliance models
- **Troubleshooting**: Diagnosing and solving common issues
- **Installation**: Providing step-by-step installation guidance

### 2. Scope Guardrails

Strict domain restrictions ensure the agent only handles refrigerator and dishwasher parts:

- Accepts: Refrigerator parts, dishwasher parts, related troubleshooting
- Rejects: All other appliances (washing machines, ovens, etc.)
- Response: Polite redirection for out-of-scope queries

### 3. RAG Pipeline

Retrieval-Augmented Generation enhances LLM responses with relevant context:

1. **Query Processing**: Intent detection and scope validation
2. **Context Retrieval**: 
   - Product search from database
   - Troubleshooting guides from knowledge base
   - Installation steps from knowledge base
3. **LLM Generation**: DeepSeek API call with enriched context
4. **Response Formatting**: Clean text output with product cards

### 4. Product Search

Intelligent product matching across:
- Product names and descriptions
- Part numbers
- Compatible model numbers
- Category filtering

### 5. Compatibility Checking

Verifies part compatibility with specific appliance models using:
- Model number matching
- Partial and exact match algorithms
- Clear compatibility messaging

## API Documentation

### Chat Endpoint

**POST** `/api/chat/message`

Send a chat message and receive an AI-powered response.

**Request Body:**
```json
{
  "message": "I need a water filter for my refrigerator",
  "conversationHistory": []
}
```

**Response:**
```json
{
  "type": "text",
  "content": "I found several water filter options...",
  "products": [
    {
      "id": "ref-001",
      "name": "Refrigerator Water Filter",
      "partNumber": "WP67001234",
      "price": 29.99,
      "description": "...",
      "compatibleModels": ["RF28R7351SG", "RF28R7551SG"]
    }
  ],
  "metadata": {
    "intent": "product_search"
  }
}
```

### Product Endpoints

**GET** `/api/products/search?query=water+filter&category=refrigerator`

Search for products by query string and optional category.

**GET** `/api/products/:id`

Retrieve a specific product by ID.

**POST** `/api/products/compatibility`

Check product compatibility with an appliance model.

**Request Body:**
```json
{
  "productId": "ref-001",
  "applianceModel": "RF28R7351SG"
}
```

## Example Queries

### Product Search
- "I need a water filter for my refrigerator"
- "Find dishwasher spray arm"
- "Looking for door gasket replacement"

### Compatibility
- "Will part WP67001234 fit model RF28R7351SG?"
- "Is this compatible with my dishwasher model DW80R5061US?"

### Troubleshooting
- "My ice maker is not working"
- "Dishwasher is leaking water"
- "Refrigerator not cooling properly"

### Installation
- "How do I install a water filter?"
- "Steps to replace dishwasher spray arm"
- "Installation guide for door gasket"

## Data Model

### Products

Each product includes:
- Unique identifier
- Name and description
- Part number
- Price
- Category (refrigerator/dishwasher)
- Compatible model numbers array
- Image URL (optional)

### Knowledge Base

Structured knowledge base includes:
- **Troubleshooting Guides**: Keyword-indexed solutions for common issues
- **Installation Steps**: Step-by-step instructions for part installation

## Security Considerations

- Environment variables stored in `.env` (excluded from version control)
- Input validation on all API endpoints
- Error messages sanitized to prevent information leakage
- CORS configured for development (should be restricted in production)

## Performance Optimizations

- Product search limited to top 5 results
- In-memory data storage for fast lookups
- Efficient keyword matching algorithms
- Response caching opportunities (future enhancement)

## Production Readiness

### Current Implementation
- Complete frontend and backend
- Error handling and fallback responses
- Scope guardrails and input validation
- Clean code architecture
- Comprehensive documentation

### Recommended Enhancements for Production

1. **Database Integration**: Replace in-memory storage with PostgreSQL/MongoDB
2. **Vector Database**: Implement Pinecone/Weaviate for semantic search
3. **Authentication**: Add user authentication and session management
4. **Caching**: Implement Redis for response caching
5. **Monitoring**: Add logging, metrics, and error tracking
6. **Testing**: Comprehensive unit and integration tests
7. **CI/CD**: Automated testing and deployment pipelines
8. **Scalability**: Load balancing and horizontal scaling

## Architecture Decisions

### In-Memory Data Storage
**Decision**: Use in-memory arrays for prototype
**Rationale**: Fast development, no database setup required, easy to extend
**Trade-off**: Data lost on restart (acceptable for prototype)

### Keyword-Based Intent Detection
**Decision**: Simple keyword matching for intent classification
**Rationale**: Fast, deterministic, no ML training required
**Trade-off**: Less sophisticated than ML-based approach (acceptable for MVP)

### DeepSeek API
**Decision**: Use DeepSeek instead of OpenAI
**Rationale**: Cost-effective, good performance, similar API structure
**Trade-off**: Less established ecosystem (acceptable for case study)

### Scope Guardrails Before LLM
**Decision**: Check scope before calling DeepSeek API
**Rationale**: Saves API costs, faster responses, better UX
**Trade-off**: May miss edge cases (mitigated by LLM system prompt)

## Development

### Available Scripts

```bash
# Install all dependencies
npm run install:all

# Run both servers concurrently
npm run dev

# Run servers separately
npm run dev:backend   # Backend only
npm run dev:frontend  # Frontend only
```

### Code Quality

- Modular architecture with clear separation of concerns
- Consistent error handling patterns
- Comprehensive code comments
- No hardcoded values or secrets

## Testing

See `EXAMPLE_QUERIES.md` for comprehensive test queries covering:
- Product searches
- Compatibility checks
- Troubleshooting scenarios
- Installation questions
- Out-of-scope queries
- Multi-turn conversations

## Documentation

- **README.md**: This file - project overview and quick start
- **SETUP.md**: Detailed setup instructions
- **ARCHITECTURE.md**: Technical architecture and design decisions
- **EXAMPLE_QUERIES.md**: Test queries and expected behaviors
- **requirements.txt**: Dependency documentation

## License

This is a case study implementation for demonstration purposes.
