# Example Queries for Testing

This document contains example queries to test the PartSelect Chat Agent.

## In-Scope Queries

### Product Search

1. "I need a water filter for my refrigerator"
2. "Find me a dishwasher spray arm"
3. "Looking for door gasket replacement"
4. "I need an ice maker for my fridge"
5. "Search for refrigerator compressor"
6. "Find dishwasher heating element"
7. "I'm looking for a drain pump for my dishwasher"

### Compatibility Questions

1. "Will part WP67001234 fit model RF28R7351SG?"
2. "Is this compatible with my refrigerator model RF23R8071SG?"
3. "Does part SA-56789 work with dishwasher model DW80R5061US?"
4. "Check compatibility for part DG-45678 with model RF28R7551SG"
5. "Will this water filter fit my fridge model?"

### Troubleshooting

1. "My ice maker is not working"
2. "Refrigerator not cooling properly"
3. "Dishwasher is leaking water"
4. "My water filter has a bad taste"
5. "Dishwasher not cleaning dishes"
6. "Refrigerator door seal is leaking air"
7. "Dishwasher not draining properly"
8. "Ice maker not making ice"

### Installation

1. "How do I install a water filter?"
2. "Steps to replace dishwasher spray arm"
3. "Installation guide for door gasket"
4. "How to install ice maker?"
5. "Replace refrigerator door seal instructions"
6. "Install dishwasher filter assembly"
7. "How to replace heating element in dishwasher"

### General Questions

1. "What parts do you have for refrigerators?"
2. "Tell me about dishwasher parts"
3. "Help me find the right part for my appliance"
4. "What's the price of water filter WP67001234?"

## Out-of-Scope Queries (Should Redirect)

1. "Tell me about washing machine parts"
2. "I need a dryer belt"
3. "Help with my oven"
4. "Microwave parts"
5. "Air conditioner filter"
6. "What about stove parts?"
7. "I need help with my heater"

## Multi-Turn Conversations

### Conversation 1: Product Search → Compatibility

**User**: "I need a water filter"
**Agent**: [Shows water filter products]

**User**: "Will this fit model RF28R7351SG?"
**Agent**: [Checks compatibility and responds]

### Conversation 2: Troubleshooting → Product Recommendation

**User**: "My ice maker isn't working"
**Agent**: [Provides troubleshooting steps]

**User**: "I think I need a new ice maker"
**Agent**: [Shows ice maker products]

### Conversation 3: Installation → Follow-up

**User**: "How do I install a door gasket?"
**Agent**: [Provides installation steps]

**User**: "What tools do I need?"
**Agent**: [Provides additional guidance]

## Testing Checklist

- [ ] Product search returns relevant results
- [ ] Product cards display correctly with all information
- [ ] Compatibility checks work with model numbers
- [ ] Troubleshooting guides are retrieved and shown
- [ ] Installation steps are provided clearly
- [ ] Out-of-scope queries are politely redirected
- [ ] Multi-turn conversations maintain context
- [ ] Error handling works when API fails
- [ ] Loading states display correctly
- [ ] UI is responsive on different screen sizes

