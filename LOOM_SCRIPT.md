# Loom Walkthrough Script

## Introduction (0:00 - 0:30)

"Hi! This is a walkthrough of the PartSelect Chat Agent case study implementation. This is a complete chat agent system built for PartSelect's e-commerce site, specializing in refrigerator and dishwasher parts. 

The system includes a React frontend, a Node.js backend with DeepSeek API integration, and a RAG-powered agent that helps customers with product compatibility, troubleshooting, installation steps, and ordering support.

Let me show you how it all works."

## Architecture Overview (0:30 - 1:30)

"First, let's look at the project structure. [Show file tree]

We have a clear separation between frontend and backend:
- The frontend is a React application using Vite and Tailwind CSS
- The backend is an Express server with modular services
- The agent system uses DeepSeek as the LLM
- We have seed data for products and a knowledge base for troubleshooting and installation

The architecture follows a clean separation of concerns with routes, services, and data layers."

## Frontend Demo (1:30 - 3:30)

"Now let's see the frontend in action. [Open browser to localhost:3000]

You can see the PartSelect-branded chat interface. The design uses PartSelect's red color scheme and has a clean, modern look.

Let me demonstrate some queries:

**Query 1: Product Search**
[Type: "I need a water filter for my refrigerator"]
- Notice how the agent finds relevant products
- Product cards appear with part numbers, prices, and descriptions
- The response is helpful and contextual

**Query 2: Compatibility Check**
[Type: "Will part WP67001234 fit model RF28R7351SG?"]
- The agent checks compatibility
- Provides clear yes/no answer with explanation

**Query 3: Troubleshooting**
[Type: "My ice maker is not working"]
- Retrieves troubleshooting guide from knowledge base
- Provides step-by-step guidance
- May suggest relevant replacement parts

**Query 4: Installation**
[Type: "How do I install a water filter?"]
- Shows installation steps
- Clear, actionable instructions

**Query 5: Out-of-Scope**
[Type: "Tell me about washing machine parts"]
- The agent politely redirects
- Explains it only handles refrigerators and dishwashers
- This is our scope guardrail in action"

## Backend Deep Dive (3:30 - 5:00)

"Let's look at the backend code. [Open code editor]

**Server Setup** [Show server.js]
- Express server with CORS enabled
- Clean route organization
- Health check endpoint

**Chat Agent Service** [Show chatAgent.js]
- This is the heart of the system
- Handles intent detection
- Builds context from products and knowledge base
- Calls DeepSeek API with proper prompts
- Formats responses with products

**Intent Detection** [Show intentDetection.js]
- Keyword-based classification
- Scope validation
- Simple but effective for MVP

**Product Service** [Show productService.js]
- Product search logic
- Compatibility checking
- Clean data access layer

**Knowledge Base** [Show knowledgeBase.js]
- Troubleshooting guides
- Installation steps
- Keyword matching for retrieval

**DeepSeek Client** [Show deepseekClient.js]
- API wrapper
- Handles authentication
- Error handling

The system uses a RAG (Retrieval-Augmented Generation) approach:
1. User query comes in
2. We detect intent and check scope
3. We retrieve relevant products and knowledge
4. We build context
5. We call DeepSeek with the context
6. We format and return the response"

## Technical Highlights (5:00 - 6:00)

"Let me highlight some key technical decisions:

**Prompt Engineering**
- Clear system prompt defining the agent's role
- Explicit scope boundaries
- Context injection strategy
- Structured response format

**Scope Guardrails**
- Check scope before expensive LLM calls
- Saves API costs
- Faster responses
- Better user experience

**RAG Pipeline**
- Product search for relevant parts
- Knowledge base retrieval for troubleshooting/installation
- Context building before LLM call
- Response formatting with product cards

**Error Handling**
- Graceful degradation if DeepSeek fails
- Fallback responses
- User-friendly error messages
- Comprehensive logging"

## Example Conversations (6:00 - 7:00)

"Let me show a few more example conversations:

**Multi-turn Conversation**
[Type: "I need a door gasket"]
[Show products]
[Type: "How do I install it?"]
[Show installation steps]

**Troubleshooting to Product**
[Type: "My dishwasher is leaking"]
[Show troubleshooting]
[Type: "I think I need a new door gasket"]
[Show products]

The system maintains context across turns, which makes for natural conversations."

## Production Readiness (7:00 - 7:30)

"While this is a prototype, here's what would be needed for production:

1. **Vector Database**: Replace in-memory search with Pinecone or Weaviate
2. **User Authentication**: Track conversations per user
3. **Database**: Persistent storage for products and knowledge
4. **Advanced Intent Detection**: ML-based classification
5. **Analytics**: Track queries and measure quality
6. **Order Integration**: Connect to actual PartSelect ordering system

The architecture is designed to be extensible, so these enhancements can be added incrementally."

## Conclusion (7:30 - 8:00)

"This case study demonstrates:
- A complete, working chat agent system
- Clean architecture with separation of concerns
- Effective prompt engineering
- Scope guardrails and error handling
- Rich UI with product cards
- Extensible design for future enhancements

The code is production-ready in structure, with clear extension points for scaling. Thank you for watching!"

## Tips for Recording

1. **Prepare Test Queries**: Have example queries ready to paste
2. **Show Code**: Use split screen to show code while demonstrating
3. **Highlight Key Files**: Focus on chatAgent.js, productService.js, and components
4. **Demonstrate Errors**: Show what happens with out-of-scope queries
5. **Show Data**: Briefly show the seed data files
6. **Keep It Concise**: Aim for 7-8 minutes total
7. **Use Annotations**: Circle or highlight important code sections

