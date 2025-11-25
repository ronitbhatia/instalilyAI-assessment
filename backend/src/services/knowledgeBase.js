import { KNOWLEDGE_BASE } from '../data/knowledgeBase.js';

export function getTroubleshootingGuide(query) {
  const lowerQuery = query.toLowerCase();
  
  for (const entry of KNOWLEDGE_BASE.troubleshooting) {
    const keywords = entry.keywords.map(k => k.toLowerCase());
    if (keywords.some(keyword => lowerQuery.includes(keyword))) {
      return entry.guide;
    }
  }
  
  return null;
}

export function getInstallationSteps(query) {
  const lowerQuery = query.toLowerCase();
  
  for (const entry of KNOWLEDGE_BASE.installation) {
    const keywords = entry.keywords.map(k => k.toLowerCase());
    if (keywords.some(keyword => lowerQuery.includes(keyword))) {
      return entry.steps;
    }
  }
  
  return null;
}

