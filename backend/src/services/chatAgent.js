import { callDeepSeek } from './deepseekClient.js';
import { searchProducts, getProductById, checkCompatibility } from './productService.js';
import { getTroubleshootingGuide, getInstallationSteps } from './knowledgeBase.js';
import { detectIntent, isWithinScope } from './intentDetection.js';

const SYSTEM_PROMPT = `You are a helpful customer service agent for PartSelect, specializing in refrigerator and dishwasher parts.

Your role:
- Answer questions about refrigerator and dishwasher parts ONLY
- Help with product compatibility, troubleshooting, installation, and ordering
- Provide clear, accurate, and helpful responses
- If asked about products outside refrigerators/dishwashers, politely redirect

Guidelines:
- Be friendly, professional, and concise
- Use product information provided to you
- For compatibility questions, reference specific model numbers
- For troubleshooting, provide step-by-step guidance
- For installation, reference installation guides when available
- Always stay within the scope of refrigerators and dishwashers
- IMPORTANT: Do NOT use markdown formatting (no **, *, #, etc.). Use plain text only.

When you reference products, format them clearly with:
- Product name
- Part number
- Price (if available)
- Compatibility information

Format your responses in plain text without any markdown syntax.`;

export async function handleChatMessage(message, conversationHistory = []) {
  // Check if message is within scope
  if (!isWithinScope(message)) {
    return {
      type: 'text',
      content: "I'm here to help with refrigerator and dishwasher parts only. Could you please ask about parts for these appliances? I can help with compatibility, troubleshooting, installation, and ordering.",
      products: [],
      metadata: { intent: 'out_of_scope' }
    };
  }

  // Detect intent
  const intent = detectIntent(message);
  
  // Build context from knowledge base and products
  let context = '';
  let products = [];
  let metadata = { intent };

  // Always try to find relevant products (helps with all intents)
  products = searchProducts(message);

  // Handle different intents
  switch (intent) {
    case 'product_search':
      if (products.length > 0) {
        context += `\n\nRelevant products found:\n${products.map(p => 
          `- ${p.name} (Part #${p.partNumber}): ${p.description} - $${p.price}`
        ).join('\n')}`;
      }
      break;

    case 'compatibility':
      const compatMatch = message.match(/(?:model|part)\s*(?:number|#)?\s*([A-Z0-9-]+)/i);
      if (compatMatch) {
        const modelNumber = compatMatch[1];
        // If we found products, check compatibility for the first one
        if (products.length > 0) {
          const compatResult = checkCompatibility(products[0].id, modelNumber);
          context += `\n\nCompatibility check: ${compatResult.compatible ? 'Compatible' : 'Not compatible'} with model ${modelNumber}. ${compatResult.message}`;
        } else {
          // Search for products that might be compatible with this model
          context += `\n\nUser is asking about compatibility with model ${modelNumber}. Search for products that might be compatible.`;
        }
      }
      break;

    case 'troubleshooting':
      const troubleshooting = getTroubleshootingGuide(message);
      if (troubleshooting) {
        context += `\n\nTroubleshooting guide:\n${troubleshooting}`;
      }
      // Include relevant products that might help with the issue
      if (products.length > 0) {
        context += `\n\nRelevant replacement parts:\n${products.map(p => 
          `- ${p.name} (Part #${p.partNumber}): $${p.price}`
        ).join('\n')}`;
      }
      break;

    case 'installation':
      const installation = getInstallationSteps(message);
      if (installation) {
        context += `\n\nInstallation steps:\n${installation}`;
      }
      // Include relevant products for installation
      if (products.length > 0) {
        context += `\n\nProduct being installed:\n${products.map(p => 
          `- ${p.name} (Part #${p.partNumber}): $${p.price}`
        ).join('\n')}`;
      }
      break;
  }

  // Build message history for DeepSeek
  const messages = [
    ...conversationHistory.map(msg => ({
      role: msg.role || 'user',
      content: msg.content
    })),
    {
      role: 'user',
      content: message + context
    }
  ];

  try {
    // Call DeepSeek
    const response = await callDeepSeek(messages, SYSTEM_PROMPT);
    
    // Strip markdown formatting from response
    const cleanResponse = response
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold **text**
      .replace(/\*(.*?)\*/g, '$1') // Remove italic *text*
      .replace(/#{1,6}\s/g, '') // Remove headers
      .replace(/```[\s\S]*?```/g, '') // Remove code blocks
      .replace(/`(.*?)`/g, '$1') // Remove inline code
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links, keep text
      .trim();
    
    return {
      type: 'text',
      content: cleanResponse,
      products: products.slice(0, 5), // Limit to 5 products
      metadata
    };
  } catch (error) {
    // Fallback response if DeepSeek fails
    console.error('DeepSeek error:', error);
    
    // Provide basic response based on intent
    let fallbackContent = '';
    if (products.length > 0) {
      fallbackContent = `I found ${products.length} product(s) that might help:\n\n${products.map(p => 
        `• ${p.name} (Part #${p.partNumber}) - $${p.price}`
      ).join('\n')}`;
    } else {
      fallbackContent = "I'm having trouble processing that right now. Could you rephrase your question about refrigerator or dishwasher parts?";
    }

    return {
      type: 'text',
      content: fallbackContent,
      products: products.slice(0, 5),
      metadata: { ...metadata, error: true }
    };
  }
}

