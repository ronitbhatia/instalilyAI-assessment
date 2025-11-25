// Simple keyword-based intent detection
// In production, this could use a more sophisticated NLP model

const SCOPE_KEYWORDS = {
  refrigerator: ['refrigerator', 'fridge', 'freezer', 'ice maker', 'water filter', 'door seal', 'gasket', 'compressor', 'evaporator', 'condenser'],
  dishwasher: ['dishwasher', 'dish washer', 'spray arm', 'door gasket', 'heating element', 'pump', 'drain hose', 'filter']
};

const INTENT_KEYWORDS = {
  product_search: ['find', 'search', 'looking for', 'need', 'buy', 'purchase', 'part', 'component'],
  compatibility: ['compatible', 'fit', 'work with', 'model', 'part number', 'fits', 'compatibility'],
  troubleshooting: ['not working', 'broken', 'issue', 'problem', 'troubleshoot', 'fix', 'repair', 'error', 'fault'],
  installation: ['install', 'installation', 'how to', 'replace', 'remove', 'install', 'setup', 'mount']
};

export function isWithinScope(message) {
  const lowerMessage = message.toLowerCase();
  
  // Check for refrigerator or dishwasher keywords
  const hasRefrigeratorKeywords = SCOPE_KEYWORDS.refrigerator.some(keyword => 
    lowerMessage.includes(keyword)
  );
  const hasDishwasherKeywords = SCOPE_KEYWORDS.dishwasher.some(keyword => 
    lowerMessage.includes(keyword)
  );

  // If message contains scope keywords, it's in scope
  if (hasRefrigeratorKeywords || hasDishwasherKeywords) {
    return true;
  }

  // Check for common appliance-related terms that might be out of scope
  const outOfScopeTerms = ['washing machine', 'dryer', 'oven', 'stove', 'microwave', 'air conditioner', 'heater'];
  const hasOutOfScopeTerms = outOfScopeTerms.some(term => lowerMessage.includes(term));
  
  // If it has out-of-scope terms and no in-scope terms, it's out of scope
  if (hasOutOfScopeTerms && !hasRefrigeratorKeywords && !hasDishwasherKeywords) {
    return false;
  }

  // If message is very short or unclear, assume it might be in scope (let the agent handle it)
  if (message.length < 10) {
    return true;
  }

  // Default: if we can't determine, assume in scope (agent will clarify)
  return true;
}

export function detectIntent(message) {
  const lowerMessage = message.toLowerCase();
  
  // Check each intent category
  for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS)) {
    const matchCount = keywords.filter(keyword => lowerMessage.includes(keyword)).length;
    if (matchCount > 0) {
      // Return the first matching intent (could be improved with scoring)
      return intent;
    }
  }

  // Default to product search if no clear intent
  return 'product_search';
}

