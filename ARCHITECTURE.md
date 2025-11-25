# Architecture Documentation

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        User Browser                          │
│                    (React Frontend)                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  ChatInterface Component                              │  │
│  │  - MessageList                                        │  │
│  │  - MessageInput                                       │  │
│  │  - ProductCard (for product display)                  │  │
│  └──────────────────────────────────────────────────────┘  │
└───────────────────────┬─────────────────────────────────────┘
                        │ HTTP/REST API
                        │ (Axios)
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                    Express Backend Server                    │
│                      (Node.js)                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Routes Layer                                         │  │
│  │  - /api/chat/message                                 │  │
│  │  - /api/products/search                              │  │
│  │  - /api/products/:id                                 │  │
│  │  - /api/products/compatibility                       │  │
│  └───────────────────────┬───────────────────────────────┘  │
│                          │                                   │
│  ┌───────────────────────▼───────────────────────────────┐  │
│  │  Chat Agent Service (chatAgent.js)                     │  │
│  │  - Intent Detection                                    │  │
│  │  - Scope Guardrails                                    │  │
│  │  - Context Building                                    │  │
│  │  - Response Formatting                                 │  │
│  └───────┬───────────────────────┬───────────────────────┘  │
│          │                       │                           │
│  ┌───────▼────────┐    ┌─────────▼──────────┐              │
│  │ Product Service│    │ Knowledge Base      │              │
│  │ - Search       │    │ - Troubleshooting   │              │
│  │ - Compatibility│    │ - Installation      │              │
│  └───────┬────────┘    └─────────────────────┘              │
│          │                                                   │
│  ┌───────▼───────────────────────────────────────┐          │
│  │  DeepSeek API Client                          │          │
│  │  - LLM Chat Completion                         │          │
│  │  - System Prompt + Context                     │          │
│  └───────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                    Data Layer                                │
│  ┌──────────────────┐         ┌──────────────────────┐     │
│  │ Product Database  │         │ Knowledge Base       │     │
│  │ (In-Memory)      │         │ (In-Memory)          │     │
│  │ - Products       │         │ - Troubleshooting    │     │
│  │ - Part Numbers   │         │ - Installation Steps │     │
│  │ - Compatibility  │         │ - Keywords            │     │
│  └──────────────────┘         └──────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. User Query Flow

```
User Input
    │
    ▼
Intent Detection (intentDetection.js)
    │
    ├─► Scope Check (isWithinScope)
    │   └─► Out of Scope? → Return redirect message
    │
    └─► Intent Classification
        ├─► product_search
        ├─► compatibility
        ├─► troubleshooting
        └─► installation
    │
    ▼
Context Building (chatAgent.js)
    │
    ├─► Product Search (productService.js)
    ├─► Knowledge Retrieval (knowledgeBase.js)
    └─► Compatibility Check (if applicable)
    │
    ▼
DeepSeek API Call (deepseekClient.js)
    │
    ├─► System Prompt
    ├─► Conversation History
    └─► User Message + Context
    │
    ▼
Response Formatting
    │
    ├─► Text Response
    ├─► Product Cards (if applicable)
    └─► Metadata
    │
    ▼
Frontend Display
```

### 2. Product Search Flow

```
Query: "water filter"
    │
    ▼
searchProducts(query)
    │
    ├─► Text Matching (name, description, part number)
    ├─► Category Filtering (if specified)
    └─► Relevance Sorting
    │
    ▼
Return Products Array
    │
    ▼
Format for Display
    │
    ├─► Product Cards
    └─► Context for LLM
```

### 3. Compatibility Check Flow

```
Query: "Will part X fit model Y?"
    │
    ▼
Extract Product ID & Model Number
    │
    ▼
checkCompatibility(productId, modelNumber)
    │
    ├─► Lookup Product
    ├─► Check Compatible Models List
    └─► Return Result
    │
    ▼
Format Response
    │
    └─► Compatible / Not Compatible + Message
```

## Component Responsibilities

### Frontend Components

#### ChatInterface
- Manages conversation state
- Handles message sending/receiving
- Coordinates loading states
- Scrolls to bottom on new messages

#### MessageList
- Renders all messages
- Passes messages to Message component

#### Message
- Displays individual message (user/assistant)
- Renders product cards if present
- Shows timestamp

#### ProductCard
- Displays product information
- Shows part number, price, description
- Lists compatible models
- Provides action buttons (View Details, Add to Cart)

#### MessageInput
- Handles user input
- Form submission
- Disabled state during loading

### Backend Services

#### chatAgent.js
- Main orchestration service
- Intent detection coordination
- Context building
- Response formatting
- Error handling

#### deepseekClient.js
- DeepSeek API wrapper
- Handles authentication
- Manages API requests/responses
- Error handling

#### productService.js
- Product search logic
- Product lookup by ID
- Compatibility checking
- Data access layer for products

#### knowledgeBase.js
- Troubleshooting guide retrieval
- Installation steps retrieval
- Keyword matching

#### intentDetection.js
- Intent classification
- Scope validation
- Keyword-based detection

## Key Design Decisions

### 1. In-Memory Data Storage
**Decision**: Use in-memory arrays for products and knowledge base
**Rationale**: 
- Fast prototype development
- No database setup required
- Easy to extend to real database later
**Trade-off**: Data lost on server restart (acceptable for prototype)

### 2. Keyword-Based Intent Detection
**Decision**: Simple keyword matching for intent classification
**Rationale**:
- Fast and deterministic
- No ML model training required
- Easy to debug and extend
**Trade-off**: Less sophisticated than ML-based approach (acceptable for MVP)

### 3. Scope Guardrails Before LLM Call
**Decision**: Check scope before calling DeepSeek API
**Rationale**:
- Saves API costs
- Faster response for out-of-scope queries
- Clearer user experience
**Trade-off**: May miss some edge cases (mitigated by LLM system prompt)

### 4. Context Injection Strategy
**Decision**: Inject product/knowledge context into user message
**Rationale**:
- Simple implementation
- Works well with DeepSeek
- Clear separation of concerns
**Trade-off**: Context length limits (mitigated by limiting products to 5)

### 5. Product Cards in Chat
**Decision**: Display products as rich cards in chat
**Rationale**:
- Better UX than plain text
- Visual product information
- Action buttons for future integration
**Trade-off**: More complex frontend (worth it for better UX)

## Extension Points

### 1. Vector Database Integration
Replace in-memory search with:
- Pinecone
- Weaviate
- Supabase Vector
- Qdrant

### 2. Advanced Intent Detection
Upgrade to:
- Fine-tuned classifier model
- Embedding-based similarity
- Multi-class classification

### 3. Conversation Memory
Add:
- User session management
- Conversation history persistence
- Context window management

### 4. Product Image Integration
- Add image URLs to product data
- Display images in ProductCard
- Image search capabilities

### 5. Order Integration
- Connect to PartSelect ordering API
- Real-time inventory checks
- Order status tracking

### 6. Analytics
- Track common queries
- Monitor intent distribution
- Measure response quality
- User satisfaction metrics

## Security Considerations

### Current Implementation
- No authentication (prototype)
- API key stored in .env (not committed)
- CORS enabled for development

### Production Recommendations
- User authentication
- Rate limiting
- Input sanitization
- API key rotation
- HTTPS only
- Request validation

## Performance Considerations

### Current Optimizations
- Product search limited to 5 results
- In-memory data (fast lookups)
- Simple keyword matching (low latency)

### Future Optimizations
- Caching for common queries
- Database indexing
- CDN for static assets
- Response compression
- Connection pooling

## Error Handling Strategy

### Frontend
- Try/catch around API calls
- User-friendly error messages
- Loading states
- Graceful degradation

### Backend
- Try/catch in all async functions
- Fallback responses if DeepSeek fails
- Logging for debugging
- HTTP status codes

### DeepSeek API
- Error handling in deepseekClient
- Fallback to basic responses
- Retry logic (future enhancement)

