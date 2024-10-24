/* eslint-disable max-len */
export const sidebarFilters = [
  'PLANTING INFORMATION',
  'TERMINATION INFORMATION',
  'CULTURAL TRAITS',
  'POTENTIAL ADVANTAGES',
  'POTENTIAL DISADVANTAGES',
];

export const filterTypes = [
  'Frost Seed',
  'Fly-free Date',
  'Termination Methods',
  'Heat Tolerance',
  'Drought Tolerance',
  'Shade Tolerance',
  'Flood Tolerance',
  'Low Fertility Tolerance',
  'Limited Rainfall',
  'Winter Survival',
  'Soil Impact - Subsoiler',
  'Soil Impact - Frees P and K',
  'Soil Impact - Loosens Topsoil',
  'Soil Ecology - Nematodes',
  'Soil Ecology - Disease',
  'Soil Ecology - Allelopathic',
  'Soil Ecology - Choke Weeds',
  'Other - Attract Beneficials',
  'Other - Bears Traffic',
  'Other - Short Windows',
  'Delayed Emergence',
  'Increased Weed Potential',
  'Increased Insects/Nematodes',
  'Increased Crop Diseases',
  'Hinders Crops',
  'Establishment Challenges',
  'Mature Incorporation Challenges',
];

export const filterResult = {
  'Frost Seed': {
    No: ['spring barley', 'winter barley', 'mung beans', 'buckwheat', 'collards or kale', 'cowpea', 'japanese millet', 'pearl millet', 'oriental/yellow mus ...', 'black oats', 'spring pea', 'winter pea', 'radish', 'rapeseed', 'annual ryegrass', 'winter cereal rye', 'forage sorghum', 'sudex', 'soybeans', 'sunflower', 'sunn hemp', 'winter triticale', 'turnip', 'hairy vetch', 'winter wheat'],
    Yes: ['balansa clover', 'crimson clover', 'red clover', 'spring oats', 'winter (bob) oats', 'yellow sweet clover'],
  },
  'Fly-free Date': {
    No: ['balansa clover', 'crimson clover', 'red clover', 'spring oats', 'winter (bob) oats', 'yellow sweet clover', 'spring barley', 'winter barley', 'mung beans', 'buckwheat', 'collards or kale', 'cowpea', 'japanese millet', 'pearl millet', 'oriental/yellow mus ...', 'black oats', 'spring pea', 'winter pea', 'radish', 'rapeseed', 'annual ryegrass', 'winter cereal rye', 'forage sorghum', 'sudex', 'soybeans', 'sunflower', 'sunn hemp', 'turnip', 'hairy vetch'],
    Yes: ['winter triticale', 'winter wheat'],
  },
  'Termination Methods': {
    Chemical: ['spring barley', 'winter barley', 'mung beans', 'buckwheat', 'cowpea', 'japanese millet', 'pearl millet', 'oriental/yellow mus ...', 'spring pea', 'radish', 'forage sorghum', 'sudex', 'soybeans', 'sunflower', 'sunn hemp', 'spring oats', 'collards or kale', 'black oats', 'winter pea', 'rapeseed', 'annual ryegrass', 'winter cereal rye', 'turnip', 'hairy vetch', 'winter triticale', 'winter wheat', 'balansa clover', 'crimson clover', 'red clover', 'winter (bob) oats', 'yellow sweet clover'],
    Freeze: ['spring barley', 'winter barley', 'mung beans', 'buckwheat', 'cowpea', 'japanese millet', 'pearl millet', 'oriental/yellow mus ...', 'spring pea', 'radish', 'forage sorghum', 'sudex', 'soybeans', 'sunflower', 'sunn hemp', 'spring oats'],
    Mow: ['spring barley', 'winter barley', 'mung beans', 'buckwheat', 'cowpea', 'japanese millet', 'pearl millet', 'spring pea', 'forage sorghum', 'sudex', 'soybeans', 'sunflower', 'sunn hemp', 'spring oats', 'black oats', 'winter pea', 'winter cereal rye', 'winter triticale', 'winter wheat', 'winter (bob) oats'],
    'Roller Crimp': ['spring barley', 'winter pea', 'winter cereal rye', 'winter triticale', 'winter wheat', 'balansa clover'],
    Tillage: 'all',
  },
  'Heat Tolerance': {
    4: ['mung beans', 'buckwheat', 'cowpea', 'japanese millet', 'pearl millet', 'forage sorghum', 'sudex', 'sunflower', 'sunn hemp', 'yellow sweet clover'],
    3: ['soybeans', 'red clover'],
    2: ['spring barley', 'balansa clover', 'winter barley', 'oriental/yellow mus ...', 'radish', 'collards or kale', 'rapeseed', 'annual ryegrass', 'turnip', 'crimson clover'],
    1: ['winter pea', 'winter cereal rye', 'winter triticale', 'winter wheat', 'spring pea', 'spring oats', 'black oats', 'winter (bob) oats', 'hairy vetch'],
    0: [],
  },
  'Drought Tolerance': {
    4: ['soybeans', 'cowpea', 'japanese millet', 'pearl millet', 'forage sorghum', 'sudex', 'sunflower', 'yellow sweet clover'],
    3: ['red clover', 'mung beans', 'buckwheat', 'sunn hemp', 'spring barley', 'winter barley', 'annual ryegrass'],
    2: ['oriental/yellow mus ...', 'radish', 'collards or kale', 'rapeseed', 'turnip', 'winter pea', 'winter cereal rye', 'winter triticale', 'winter wheat', 'spring pea', 'spring oats', 'black oats', 'winter (bob) oats', 'hairy vetch'],
    1: ['crimson clover'],
    0: ['balansa clover'],
  },
  'Shade Tolerance': {
    4: ['cowpea', 'annual ryegrass'],
    3: ['red clover', 'crimson clover'],
    2: ['balansa clover', 'soybeans', 'pearl millet', 'yellow sweet clover', 'winter barley', 'oriental/yellow mus ...', 'radish', 'collards or kale', 'rapeseed', 'turnip', 'winter cereal rye', 'winter triticale', 'winter wheat', 'spring oats', 'black oats', 'winter (bob) oats', 'hairy vetch'],
    1: ['sunn hemp', 'spring barley', 'winter pea', 'spring pea'],
    0: ['japanese millet', 'forage sorghum', 'sudex', 'sunflower', 'mung beans', 'buckwheat'],
  },
  'Flood Tolerance': {
    4: ['annual ryegrass'],
    3: ['japanese millet', 'forage sorghum', 'sudex', 'winter cereal rye', 'spring oats', 'black oats', 'winter (bob) oats'],
    2: ['red clover', 'pearl millet', 'winter triticale', 'hairy vetch'],
    1: ['sunflower', 'buckwheat', 'cowpea', 'crimson clover', 'soybeans', 'yellow sweet clover', 'winter barley', 'oriental/yellow mus ...', 'radish', 'collards or kale', 'rapeseed', 'turnip', 'winter wheat', 'sunn hemp', 'spring barley', 'winter pea', 'spring pea'],
    0: ['mung beans', 'balansa clover'],
  },
  'Low Fertility Tolerance': {
    4: ['buckwheat', 'yellow sweet clover'],
    3: ['mung beans', 'japanese millet', 'winter cereal rye', 'black oats', 'winter barley', 'sunn hemp', 'spring barley', 'spring pea'],
    2: ['balansa clover', 'annual ryegrass', 'forage sorghum', 'sudex', 'spring oats', 'winter (bob) oats', 'red clover', 'pearl millet', 'winter triticale', 'hairy vetch', 'sunflower', 'cowpea', 'crimson clover', 'soybeans', 'oriental/yellow mus ...', 'collards or kale', 'rapeseed', 'turnip', 'winter wheat', 'winter pea'],
    1: ['radish'],
    0: [],
  },
  'Limited Rainfall': {
    4: [],
    3: [],
    2: [],
    1: [],
    0: 'all',
  },
  'Winter Survival': {
    4: ['yellow sweet clover', 'winter cereal rye', 'black oats', 'winter barley', 'annual ryegrass', 'red clover', 'winter triticale', 'hairy vetch', 'crimson clover', 'collards or kale', 'rapeseed', 'turnip', 'winter wheat', 'winter pea'],
    3: ['black oats', 'collards or kale'],
    2: ['black oats', 'collards or kale', 'spring barley', 'oriental/yellow mus ...', 'radish'],
    1: ['black oats', 'collards or kale', 'buckwheat', 'mung beans', 'japanese millet', 'sunn hemp', 'spring pea', 'forage sorghum', 'sudex', 'spring oats', 'winter (bob) oats', 'pearl millet', 'sunflower', 'cowpea', 'soybeans'],
    0: [],
  },
  'Soil Impact - Subsoiler': {
    4: ['yellow sweet clover', 'annual ryegrass', 'sunflower'],
    3: ['winter cereal rye', 'winter triticale', 'radish', 'sunn hemp', 'sudex'],
    2: ['spring barley', 'winter barley', 'balansa clover', 'crimson clover', 'red clover', 'cowpea', 'pearl millet', 'black oats', 'winter (bob) oats', 'winter pea', 'rapeseed', 'forage sorghum', 'soybeans', 'hairy vetch', 'winter wheat'],
    1: ['collards or kale', 'turnip', 'oriental/yellow mus ...', 'mung beans', 'japanese millet', 'spring pea', 'spring oats'],
    0: ['buckwheat'],
  },
  'Soil Impact - Frees P and K': {
    4: ['buckwheat'],
    3: [],
    2: [],
    1: [],
    0: [],
  },
  'Soil Impact - Loosens Topsoil': {
    4: ['forage sorghum'],
    3: ['buckwheat', 'spring barley', 'winter barley', 'mung beans', 'balansa clover', 'crimson clover', 'red clover', 'cowpea', 'radish', 'annual ryegrass', 'winter cereal rye', 'soybeans', 'sunn hemp', 'winter triticale', 'turnip', 'hairy vetch'],
    2: ['collards or kale', 'japanese millet', 'pearl millet', 'oriental/yellow mus ...', 'black oats', 'spring oats', 'winter (bob) oats', 'spring pea', 'winter pea', 'rapeseed', 'sudex', 'yellow sweet clover', 'winter wheat'],
    1: ['sunflower'],
    0: [],
  },
  'Soil Ecology - Nematodes': {
    4: [],
    3: ['radish', 'japanese millet', 'pearl millet', 'oriental/yellow mus ...', 'rapeseed', 'sudex'],
    2: ['crimson clover', 'red clover', 'cowpea', 'winter cereal rye', 'turnip', 'hairy vetch', 'spring pea', 'winter pea', 'yellow sweet clover'],
    1: ['buckwheat', 'spring barley', 'winter barley', 'balansa clover', 'annual ryegrass', 'winter triticale', 'spring oats', 'winter wheat'],
    0: ['soybeans'],
  },
  'Soil Ecology - Disease': {
    4: [],
    3: ['japanese millet', 'pearl millet', 'sudex', 'winter pea'],
    2: ['radish', 'oriental/yellow mus ...', 'rapeseed', 'crimson clover', 'winter cereal rye', 'turnip', 'hairy vetch', 'spring pea', 'balansa clover', 'annual ryegrass', 'winter triticale', 'spring oats', 'winter (bob) oats'],
    1: ['red clover', 'yellow sweet clover', 'spring barley', 'winter barley', 'winter wheat'],
    0: ['soybeans', 'cowpea', 'buckwheat'],
  },
  'Soil Ecology - Allelopathic': {
    4: ['winter cereal rye', 'forage sorghum'],
    3: ['buckwheat', 'sudex', 'radish', 'rapeseed', 'turnip', 'winter triticale', 'spring oats', 'winter (bob) oats', 'spring barley', 'winter barley', 'collards or kale', 'black oats'],
    2: ['oriental/yellow mus ...', 'winter wheat', 'sunn hemp'],
    1: ['crimson clover', 'hairy vetch', 'red clover', 'yellow sweet clover'],
    0: ['soybeans', 'cowpea', 'japanese millet', 'pearl millet', 'winter pea', 'spring pea', 'balansa clover', 'annual ryegrass', 'mung beans', 'sunflower'],
  },
  'Soil Ecology - Choke Weeds': {
    4: ['japanese millet', 'pearl millet', 'annual ryegrass', 'winter cereal rye', 'forage sorghum', 'buckwheat', 'sudex', 'winter triticale', 'spring oats', 'winter (bob) oats', 'sunn hemp'],
    3: ['soybeans', 'radish', 'rapeseed', 'turnip', 'spring barley', 'winter barley', 'collards or kale', 'black oats', 'oriental/yellow mus ...', 'winter wheat', 'hairy vetch'],
    2: ['cowpea', 'winter pea', 'spring pea', 'balansa clover', 'mung beans', 'crimson clover', 'red clover', 'yellow sweet clover'],
    1: ['sunflower'],
    0: [],
  },
  'Other - Attract Beneficials': {
    4: ['buckwheat', 'rapeseed', 'hairy vetch', 'sunflower'],
    3: ['sunn hemp', 'soybeans', 'oriental/yellow mus ...', 'cowpea', 'winter pea', 'spring pea', 'balansa clover', 'mung beans', 'crimson clover', 'red clover', 'yellow sweet clover'],
    2: ['forage sorghum', 'sudex', 'turnip', 'collards or kale'],
    1: ['japanese millet', 'pearl millet', 'annual ryegrass', 'winter cereal rye', 'winter triticale', 'radish', 'spring barley', 'winter barley', 'winter wheat'],
    0: ['spring oats', 'winter (bob) oats', 'black oats'],
  },
  'Other - Bears Traffic': {
    4: ['annual ryegrass'],
    3: ['spring oats', 'winter (bob) oats', 'black oats', 'forage sorghum', 'sudex', 'winter cereal rye', 'winter triticale', 'spring barley', 'winter barley', 'winter wheat'],
    2: ['balansa clover', 'crimson clover', 'red clover', 'yellow sweet clover', 'japanese millet', 'pearl millet'],
    1: ['buckwheat', 'rapeseed', 'hairy vetch', 'sunflower', 'sunn hemp', 'soybeans', 'oriental/yellow mus ...', 'cowpea', 'winter pea', 'spring pea', 'mung beans', 'turnip', 'collards or kale', 'radish'],
    0: [],
  },
  'Other - Short Windows': {
    4: ['annual ryegrass', 'spring oats', 'winter (bob) oats', 'black oats', 'forage sorghum', 'sudex', 'winter cereal rye', 'winter triticale', 'spring barley', 'winter barley', 'winter wheat', 'japanese millet', 'pearl millet', 'buckwheat'],
    3: ['rapeseed', 'sunn hemp', 'soybeans', 'oriental/yellow mus ...', 'cowpea', 'winter pea', 'spring pea', 'turnip', 'collards or kale', 'radish'],
    2: ['crimson clover', 'mung beans'],
    1: ['balansa clover', 'red clover', 'yellow sweet clover', 'hairy vetch', 'sunflower'],
    0: [],
  },
  'Delayed Emergence': {
    4: ['spring oats', 'winter (bob) oats', 'black oats', 'forage sorghum', 'sudex', 'spring barley', 'japanese millet', 'pearl millet', 'sunn hemp', 'soybeans', 'cowpea', 'winter pea', 'spring pea', 'mung beans'],
    3: ['radish', 'balansa clover', 'sunflower'],
    2: ['winter cereal rye', 'winter triticale', 'winter barley', 'winter wheat', 'buckwheat', 'rapeseed', 'turnip', 'collards or kale', 'crimson clover', 'red clover'],
    1: ['annual ryegrass', 'oriental/yellow mus ...', 'hairy vetch'],
    0: ['yellow sweet clover'],
  },
  'Increased Weed Potential': {
    4: ['spring oats', 'winter (bob) oats', 'black oats', 'pearl millet', 'sunn hemp', 'soybeans', 'cowpea', 'winter pea', 'spring pea', 'mung beans', 'balansa clover', 'crimson clover'],
    3: ['forage sorghum', 'sudex', 'spring barley', 'japanese millet', 'radish', 'sunflower', 'winter cereal rye', 'winter triticale', 'winter barley', 'winter wheat', 'buckwheat', 'rapeseed', 'turnip', 'collards or kale', 'red clover'],
    2: [],
    1: ['yellow sweet clover', 'oriental/yellow mus ...', 'hairy vetch'],
    0: ['annual ryegrass'],
  },
  'Increased Insects/Nematodes': {
    4: [],
    3: ['black oats', 'pearl millet', 'forage sorghum', 'sudex', 'japanese millet', 'buckwheat'],
    2: ['annual ryegrass', 'spring oats', 'cowpea', 'winter pea', 'balansa clover', 'crimson clover', 'radish', 'sunflower', 'winter triticale', 'winter wheat', 'rapeseed', 'turnip', 'oriental/yellow mus ...', 'hairy vetch'],
    1: ['soybeans', 'spring pea', 'spring barley', 'winter cereal rye', 'winter barley', 'red clover', 'yellow sweet clover'],
    0: [],
  },
  'Increased Crop Diseases': {
    4: ['buckwheat', 'japanese millet', 'pearl millet', 'oriental/yellow mus ...', 'radish', 'rapeseed', 'sudex', 'yellow sweet clover', 'turnip', 'hairy vetch'],
    3: ['balansa clover', 'crimson clover', 'red clover', 'spring oats', 'annual ryegrass', 'winter cereal rye'],
    2: ['cowpea', 'soybeans', 'winter triticale'],
    1: ['spring barley', 'winter barley', 'spring pea', 'winter pea', 'winter wheat'],
    0: [],
  },
  'Hinders Crops': {
    4: ['buckwheat', 'japanese millet', 'pearl millet', 'oriental/yellow mus ...', 'radish', 'rapeseed', 'sudex', 'yellow sweet clover', 'turnip', 'hairy vetch', 'balansa clover', 'crimson clover', 'red clover', 'spring oats', 'annual ryegrass', 'cowpea', 'soybeans', 'winter triticale', 'spring barley', 'winter barley', 'spring pea', 'winter pea', 'winter wheat', 'mung beans', 'collards or kale', 'black oats', 'winter (bob) oats', 'forage sorghum', 'sunflower', 'sunn hemp'],
    3: ['winter cereal rye'],
    2: [],
    1: [],
    0: [],
  },
  'Establishment Challenges': {
    4: ['buckwheat', 'sudex', 'spring oats', 'annual ryegrass', 'cowpea', 'soybeans', 'winter triticale', 'spring barley', 'winter barley', 'spring pea', 'winter wheat', 'black oats', 'winter (bob) oats', 'forage sorghum', 'winter cereal rye'],
    3: ['japanese millet', 'pearl millet', 'oriental/yellow mus ...', 'radish', 'rapeseed', 'yellow sweet clover', 'turnip', 'hairy vetch', 'balansa clover', 'crimson clover', 'red clover', 'winter pea', 'mung beans', 'collards or kale', 'sunflower', 'sunn hemp'],
    2: [],
    1: [],
    0: [],
  },
  'Mature Incorporation Challenges': {
    4: ['buckwheat', 'spring oats', 'cowpea', 'soybeans', 'spring pea', 'black oats', 'winter (bob) oats', 'oriental/yellow mus ...', 'radish', 'rapeseed', 'turnip', 'crimson clover', 'winter pea', 'mung beans', 'collards or kale'],
    3: ['sudex', 'winter triticale', 'spring barley', 'winter barley', 'winter wheat', 'japanese millet', 'pearl millet', 'yellow sweet clover', 'balansa clover', 'red clover', 'sunflower'],
    2: ['annual ryegrass', 'forage sorghum', 'winter cereal rye', 'hairy vetch', 'sunn hemp'],
    1: [],
    0: [],
  },
};