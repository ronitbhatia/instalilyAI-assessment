// Seed data for refrigerator and dishwasher parts
export const PRODUCT_DATABASE = [
  // Refrigerator Parts
  {
    id: 'ref-001',
    name: 'Refrigerator Water Filter',
    partNumber: 'WP67001234',
    category: 'refrigerator',
    description: 'Universal water filter replacement for most refrigerator models. Reduces chlorine taste and odor.',
    price: 29.99,
    compatibleModels: ['RF28R7351SG', 'RF28R7551SG', 'RF23R8071SG'],
    imageUrl: null
  },
  {
    id: 'ref-002',
    name: 'Refrigerator Door Gasket Seal',
    partNumber: 'DG-45678',
    category: 'refrigerator',
    description: 'Replacement door seal gasket for side-by-side and French door refrigerators. Prevents air leaks.',
    price: 45.99,
    compatibleModels: ['RF28R7351SG', 'RF23R8071SG', 'RF28R7551SG'],
    imageUrl: null
  },
  {
    id: 'ref-003',
    name: 'Ice Maker Assembly',
    partNumber: 'IM-78901',
    category: 'refrigerator',
    description: 'Complete ice maker assembly with motor and housing. Compatible with most modern refrigerators.',
    price: 89.99,
    compatibleModels: ['RF28R7351SG', 'RF23R8071SG'],
    imageUrl: null
  },
  {
    id: 'ref-004',
    name: 'Refrigerator Compressor',
    partNumber: 'COMP-12345',
    category: 'refrigerator',
    description: 'High-efficiency compressor replacement. Professional installation recommended.',
    price: 299.99,
    compatibleModels: ['RF28R7351SG', 'RF28R7551SG'],
    imageUrl: null
  },
  {
    id: 'ref-005',
    name: 'Evaporator Fan Motor',
    partNumber: 'EFM-23456',
    category: 'refrigerator',
    description: 'Replacement evaporator fan motor for freezer compartment. Quiet operation.',
    price: 64.99,
    compatibleModels: ['RF28R7351SG', 'RF23R8071SG', 'RF28R7551SG'],
    imageUrl: null
  },
  {
    id: 'ref-006',
    name: 'Refrigerator Door Handle',
    partNumber: 'DH-34567',
    category: 'refrigerator',
    description: 'Stainless steel door handle replacement. Available in multiple finishes.',
    price: 34.99,
    compatibleModels: ['RF28R7351SG', 'RF23R8071SG'],
    imageUrl: null
  },
  
  // Dishwasher Parts
  {
    id: 'dw-001',
    name: 'Dishwasher Spray Arm',
    partNumber: 'SA-56789',
    category: 'dishwasher',
    description: 'Upper spray arm replacement. Ensures even water distribution for clean dishes.',
    price: 39.99,
    compatibleModels: ['DW80R5061US', 'DW80R5061UG', 'DW80R9950US'],
    imageUrl: null
  },
  {
    id: 'dw-002',
    name: 'Dishwasher Door Gasket',
    partNumber: 'DWG-67890',
    category: 'dishwasher',
    description: 'Replacement door seal gasket. Prevents water leaks during wash cycles.',
    price: 24.99,
    compatibleModels: ['DW80R5061US', 'DW80R5061UG', 'DW80R9950US'],
    imageUrl: null
  },
  {
    id: 'dw-003',
    name: 'Dishwasher Heating Element',
    partNumber: 'HE-78901',
    category: 'dishwasher',
    description: 'Replacement heating element for drying cycle. High-quality stainless steel construction.',
    price: 54.99,
    compatibleModels: ['DW80R5061US', 'DW80R5061UG'],
    imageUrl: null
  },
  {
    id: 'dw-004',
    name: 'Dishwasher Drain Pump',
    partNumber: 'DP-89012',
    category: 'dishwasher',
    description: 'Replacement drain pump assembly. Removes water from dishwasher after cycles.',
    price: 79.99,
    compatibleModels: ['DW80R5061US', 'DW80R5061UG', 'DW80R9950US'],
    imageUrl: null
  },
  {
    id: 'dw-005',
    name: 'Dishwasher Filter Assembly',
    partNumber: 'FA-90123',
    category: 'dishwasher',
    description: 'Complete filter assembly including mesh and fine filters. Easy to clean design.',
    price: 29.99,
    compatibleModels: ['DW80R5061US', 'DW80R5061UG', 'DW80R9950US'],
    imageUrl: null
  },
  {
    id: 'dw-006',
    name: 'Dishwasher Door Latch',
    partNumber: 'DL-01234',
    category: 'dishwasher',
    description: 'Replacement door latch mechanism. Ensures secure door closure during operation.',
    price: 44.99,
    compatibleModels: ['DW80R5061US', 'DW80R5061UG'],
    imageUrl: null
  },
  {
    id: 'dw-007',
    name: 'Dishwasher Circulation Pump',
    partNumber: 'CP-12345',
    category: 'dishwasher',
    description: 'Main circulation pump for wash water. High-pressure design for thorough cleaning.',
    price: 119.99,
    compatibleModels: ['DW80R5061US', 'DW80R5061UG', 'DW80R9950US'],
    imageUrl: null
  }
];

