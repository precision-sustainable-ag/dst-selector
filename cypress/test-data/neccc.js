/* eslint-disable max-len */
export const sidebarFilters = ['WEEDS', 'ENVIRONMENTAL TOLERANCES', 'GROWTH TRAITS', 'SOIL CONDITIONS', 'PLANTING', 'TERMINATION'];
export const filterTypes = [
  'Persistence', // 0
  'Volunteer Establishment', // 1
  'Drought', // 2
  'Flood', // 3
  'Heat', // 4
  'Low Fertility', // 5
  'Salinity', // 6
  'Shade', // 7
  'Active Growth Period', // 8
  'Duration', // 9
  'Early Spring Growth', // 10
  'Ease of Establishment', // 11
  'Establishes Quickly', // 12
  'Growing Window', // 13
  'Root Architecture', // 14
  'Root Depth', // 15
  'Winter Survival', // 16
  'Supports Mycorrhizae', // 17
  'Frost Seed', // 18
  'Seed Price Per lb', // 19
  'Aerial Seed', // 20
  'Chemical at Flowering', // 21
  'Chemical at Vegetative', // 22
  'Freezing at Flowering', // 23
  'Freezing at Vegetative', // 24
  'Mow at Flowering', // 25
  'Roller-Crimp at Flowering', // 26
  'Tillage at Flowering', // 27
  'Tillage at Vegetative',
];

export const filterResult = {
  Persistence: {
    5: ['red clover', 'hairy vetch'],
    4: ['phacelia', 'sunn hemp'],
    3: ['balansa clover', 'berseem clover', 'pearl millet', 'perennial ryegrass', 'sunflower'],
    2: ['winter barley', 'cowpea', 'japanese millet', 'forage radish', 'sudex', 'sudangrass', 'teff', 'forage turnip', 'purple top turnip'],
    1: ['spring barley', 'forage brassica', 'buckwheat', 'spring cereal rye', 'winter cereal rye', 'crimson clover', 'mustard', 'black oats', 'spring oats', 'spring pea', 'winter pea', 'forage rapeseed', 'annual ryegrass', 'soybean', 'yellow sweetclover', 'spring triticale', 'winter triticale', 'spring wheat', 'winter wheat'],
  },
  'Volunteer Establishment': {
    5: ['spring barley', 'buckwheat', 'spring cereal rye', 'winter cereal rye', 'crimson clover', 'mustard', 'spring oats', 'spring pea', 'winter pea', 'forage rapeseed', 'annual ryegrass', 'spring triticale', 'winter triticale', 'spring wheat', 'winter wheat', 'red clover', 'hairy vetch', 'balansa clover', 'berseem clover', 'perennial ryegrass', 'winter barley', 'sudex', 'sudangrass'],
    4: ['black oats', 'sunflower', 'japanese millet', 'forage radish'],
    3: ['pearl millet'],
    2: ['forage brassica', 'soybean', 'yellow sweetclover', 'phacelia'],
    1: ['sunn hemp', 'cowpea', 'teff', 'forage turnip', 'purple top turnip'],
  },
  Drought: {
    5: ['cowpea', 'teff', 'sudex', 'sudangrass', 'sunflower', 'pearl millet', 'soybean', 'yellow sweetclover'],
    4: ['sunn hemp', 'spring barley', 'spring cereal rye', 'winter cereal rye'],
    3: ['buckwheat', 'crimson clover', 'mustard', 'spring oats', 'spring pea', 'winter pea', 'forage rapeseed', 'spring triticale', 'winter triticale', 'spring wheat', 'winter wheat', 'red clover', 'hairy vetch', 'balansa clover', 'berseem clover', 'winter barley', 'black oats', 'japanese millet', 'forage brassica', 'phacelia'],
    2: ['forage turnip', 'purple top turnip', 'annual ryegrass', 'perennial ryegrass', 'forage radish'],
    1: [],
  },
  Flood: {
    5: [],
    4: ['teff', 'yellow sweetclover', 'spring oats', 'balansa clover', 'black oats', 'annual ryegrass', 'perennial ryegrass'],
    3: ['spring oats', 'spring cereal rye', 'winter cereal rye', 'winter triticale', 'spring wheat', 'red clover', 'winter barley', 'phacelia'],
    2: ['cowpea', 'sudex', 'sudangrass', 'sunflower', 'pearl millet', 'sunn hemp', 'japanese millet', 'soybean', 'spring barley', 'buckwheat', 'crimson clover', 'mustard', 'spring pea', 'winter pea', 'forage rapeseed', 'spring triticale', 'winter wheat', 'hairy vetch', 'berseem clover', 'forage brassica', 'forage turnip', 'purple top turnip', 'forage radish'],
    1: [],
  },
  Heat: {
    5: ['teff', 'cowpea', 'sudex', 'sudangrass', 'sunflower', 'pearl millet', 'sunn hemp', 'japanese millet'],
    4: ['yellow sweetclover', 'balansa clover', 'red clover', 'soybean', 'buckwheat', 'crimson clover', 'berseem clover'],
    3: ['spring oats', 'annual ryegrass', 'perennial ryegrass', 'spring cereal rye', 'winter cereal rye', 'winter triticale', 'winter barley', 'phacelia', 'spring barley', 'mustard', 'spring pea', 'forage rapeseed', 'spring triticale', 'winter wheat', 'forage brassica', 'forage turnip', 'purple top turnip', 'forage radish'],
    2: ['spring oats', 'black oats', 'spring wheat', 'winter pea', 'hairy vetch'],
    1: [],
  },
  'Low Fertility': {
    5: ['cowpea', 'yellow sweetclover', 'buckwheat', 'spring cereal rye', 'winter cereal rye'],
    4: ['pearl millet', 'sunn hemp', 'winter triticale', 'winter barley', 'spring barley', 'spring pea', 'black oats', 'winter pea'],
    3: ['teff', 'sudex', 'sudangrass', 'sunflower', 'japanese millet', 'red clover', 'soybean', 'crimson clover', 'spring oats', 'phacelia', 'mustard', 'forage rapeseed', 'spring triticale', 'winter wheat', 'forage brassica', 'spring wheat'],
    2: ['balansa clover', 'berseem clover', 'annual ryegrass', 'perennial ryegrass', 'forage turnip', 'purple top turnip', 'forage radish', 'hairy vetch'],
    1: [],
  },
  Salinity: {
    5: [],
    4: [],
    3: ['yellow sweetclover', 'winter barley', 'spring barley', 'teff', 'forage brassica', 'balansa clover', 'perennial ryegrass'],
    2: ['cowpea', 'buckwheat', 'spring cereal rye', 'winter cereal rye', 'pearl millet', 'sunn hemp', 'winter triticale', 'black oats', 'sudex', 'sudangrass', 'sunflower', 'japanese millet', 'soybean', 'spring oats', 'mustard', 'spring triticale', 'winter wheat', 'spring wheat', 'annual ryegrass', 'forage turnip', 'purple top turnip'],
    1: ['spring pea', 'winter pea', 'red clover', 'crimson clover', 'phacelia', 'forage rapeseed', 'berseem clover', 'forage radish', 'hairy vetch'],
  },
  Shade: {
    5: [],
    4: ['red clover', 'crimson clover', 'perennial ryegrass', 'winter cereal rye', 'annual ryegrass'],
    3: ['spring oats', 'winter barley', 'forage brassica', 'spring cereal rye', 'cowpea', 'mustard', 'black oats', 'forage radish', 'forage rapeseed', 'soybean', 'yellow sweetclover', 'spring triticale', 'winter triticale', 'forage turnip', 'purple top turnip', 'hairy vetch', 'winter wheat'],
    2: ['spring oats', 'spring pea', 'winter pea', 'phacelia', 'berseem clover', 'spring barley', 'teff', 'balansa clover', 'buckwheat', 'sunn hemp', 'spring wheat'],
    1: ['pearl millet', 'sudex', 'sudangrass', 'sunflower', 'japanese millet'],
  },
  'Active Growth Period': {
    Fall: ['spring oats', 'spring pea', 'winter pea', 'phacelia', 'spring wheat', 'red clover', 'crimson clover', 'perennial ryegrass', 'winter cereal rye', 'annual ryegrass', 'forage radish', 'hairy vetch', 'winter barley', 'forage brassica', 'black oats', 'mustard', 'forage turnip', 'purple top turnip'],
    Spring: ['spring oats', 'spring pea', 'winter pea', 'phacelia', 'spring wheat', 'red clover', 'crimson clover', 'perennial ryegrass', 'winter cereal rye', 'annual ryegrass', 'forage radish', 'hairy vetch', 'winter barley', 'forage brassica', 'black oats', 'mustard', 'forage turnip', 'purple top turnip', 'spring barley', 'spring cereal rye', 'winter wheat'],
    Summer: ['spring pea', 'red clover', 'crimson clover', 'annual ryegrass', 'mustard', 'spring barley', 'spring cereal rye', 'berseem clover', 'teff', 'balansa clover', 'buckwheat', 'sunn hemp', 'pearl millet', 'sudex', 'sudangrass', 'sunflower', 'japanese millet', 'yellow sweetclover', 'cowpea', 'soybean'],
    Winter: ['annual ryegrass', 'berseem clover', 'balansa clover', 'perennial ryegrass', 'hairy vetch', 'winter wheat', 'forage rapeseed', 'winter triticale', 'spring triticale'],
  },
  Duration: {
    Annual: ['annual ryegrass', 'berseem clover', 'balansa clover', 'hairy vetch', 'winter wheat', 'forage rapeseed', 'winter triticale', 'spring triticale', 'spring pea', 'crimson clover', 'mustard', 'spring barley', 'spring cereal rye', 'teff', 'buckwheat', 'sunn hemp', 'pearl millet', 'sudex', 'sudangrass', 'sunflower', 'japanese millet', 'yellow sweetclover', 'cowpea', 'soybean', 'spring oats', 'winter pea', 'phacelia', 'spring wheat', 'winter cereal rye', 'forage radish', 'winter barley', 'forage brassica', 'black oats', 'forage turnip', 'purple top turnip'],
    Biennial: ['yellow sweetclover'],
    Perennial: [],
    'Short-lived Perennial': ['perennial ryegrass', 'red clover'],
  },
  'Early Spring Growth': {
    5: ['hairy vetch', 'winter wheat', 'teff', 'buckwheat', 'sunn hemp', 'pearl millet', 'sudex', 'sudangrass', 'sunflower', 'japanese millet', 'cowpea', 'soybean', 'black oats', 'forage turnip', 'purple top turnip'],
    4: ['teff', 'buckwheat', 'sunn hemp', 'pearl millet', 'sudex', 'sudangrass', 'sunflower', 'japanese millet', 'cowpea', 'soybean', 'black oats', 'forage turnip', 'purple top turnip', 'red clover', 'winter triticale', 'spring triticale', 'crimson clover', 'spring cereal rye', 'winter pea', 'spring wheat', 'winter cereal rye', 'winter barley'],
    3: ['teff', 'buckwheat', 'sunn hemp', 'pearl millet', 'sudex', 'sudangrass', 'sunflower', 'japanese millet', 'cowpea', 'soybean', 'black oats', 'forage turnip', 'purple top turnip', 'perennial ryegrass', 'yellow sweetclover', 'annual ryegrass', 'balansa clover', 'forage rapeseed', 'spring pea', 'spring barley', 'spring oats'],
    2: ['teff', 'buckwheat', 'sunn hemp', 'pearl millet', 'sudex', 'sudangrass', 'sunflower', 'japanese millet', 'cowpea', 'soybean', 'black oats', 'forage turnip', 'purple top turnip', 'berseem clover'],
    1: ['teff', 'buckwheat', 'sunn hemp', 'pearl millet', 'sudex', 'sudangrass', 'sunflower', 'japanese millet', 'cowpea', 'soybean', 'black oats', 'forage turnip', 'purple top turnip', 'spring oats', 'mustard', 'phacelia', 'forage radish', 'forage brassica'],
  },
  'Ease of Establishment': {
    5: ['spring oats', 'winter wheat', 'winter triticale', 'spring triticale', 'spring cereal rye', 'spring wheat', 'winter cereal rye'],
    4: ['buckwheat', 'sudex', 'sudangrass', 'cowpea', 'soybean', 'black oats', 'forage radish', 'crimson clover', 'winter pea', 'winter barley', 'perennial ryegrass', 'annual ryegrass', 'spring pea', 'spring barley'],
    3: ['sunn hemp', 'pearl millet', 'sunflower', 'phacelia', 'hairy vetch', 'red clover'],
    2: ['japanese millet', 'mustard', 'yellow sweetclover', 'balansa clover', 'berseem clover'],
    1: ['teff', 'forage turnip', 'purple top turnip', 'forage brassica', 'forage rapeseed'],
  },
  'Establishes Quickly': {
    5: ['spring cereal rye', 'buckwheat'],
    4: ['teff', 'forage turnip', 'purple top turnip', 'forage brassica', 'forage rapeseed', 'spring oats', 'winter wheat', 'winter triticale', 'spring triticale', 'spring wheat', 'winter cereal rye', 'sudex', 'cowpea', 'black oats', 'forage radish', 'pearl millet', 'red clover', 'japanese millet', 'mustard'],
    3: ['sudangrass', 'soybean', 'crimson clover', 'winter barley', 'perennial ryegrass', 'annual ryegrass', 'spring barley', 'sunn hemp', 'sunflower', 'phacelia'],
    2: ['winter pea', 'spring pea', 'hairy vetch', 'yellow sweetclover'],
    1: ['balansa clover', 'berseem clover'],
  },
  'Growing Window': {
    5: ['balansa clover', 'berseem clover', 'sunflower', 'hairy vetch', 'yellow sweetclover'],
    4: ['forage rapeseed', 'red clover', 'crimson clover'],
    3: ['forage turnip', 'purple top turnip', 'forage brassica', 'winter wheat', 'winter triticale', 'spring triticale', 'spring wheat', 'forage radish', 'mustard', 'soybean', 'sunn hemp', 'winter pea', 'spring pea'],
    2: ['spring cereal rye', 'teff', 'spring oats', 'winter cereal rye', 'sudex', 'cowpea', 'black oats', 'pearl millet', 'japanese millet', 'sudangrass', 'winter barley', 'perennial ryegrass', 'annual ryegrass', 'spring barley', 'phacelia'],
    1: ['buckwheat'],
  },
  'Root Architecture': {
    Fibrous: ['buckwheat', 'spring cereal rye', 'teff', 'spring oats', 'winter cereal rye', 'sudex', 'black oats', 'pearl millet', 'japanese millet', 'sudangrass', 'winter barley', 'perennial ryegrass', 'annual ryegrass', 'spring barley', 'phacelia', 'winter wheat', 'winter triticale', 'spring triticale', 'spring wheat'],
    Tap: ['cowpea', 'balansa clover', 'berseem clover', 'sunflower', 'hairy vetch', 'yellow sweetclover', 'forage rapeseed', 'red clover', 'crimson clover', 'forage turnip', 'purple top turnip', 'forage brassica', 'forage radish', 'mustard', 'soybean', 'sunn hemp', 'winter pea', 'spring pea'],
  },
  'Root Depth': {
    Deep: ['red clover', 'cowpea', 'phacelia', 'forage radish', 'forage rapeseed', 'annual ryegrass', 'perennial ryegrass', 'sunflower', 'yellow sweetclover'],
    Medium: ['balansa clover', 'hairy vetch', 'crimson clover', 'forage turnip', 'purple top turnip', 'forage brassica', 'mustard', 'soybean', 'sunn hemp', 'winter pea', 'spring pea', 'buckwheat', 'spring cereal rye', 'teff', 'spring oats', 'winter cereal rye', 'sudex', 'black oats', 'pearl millet', 'japanese millet', 'sudangrass', 'winter barley', 'spring barley', 'winter wheat', 'winter triticale', 'spring triticale', 'spring wheat'],
    Shallow: ['berseem clover'],
  },
  'Winter Survival': {
    Expected: ['balansa clover', 'hairy vetch', 'crimson clover', 'winter cereal rye', 'winter barley', 'winter wheat', 'winter triticale', 'spring triticale', 'yellow sweetclover', 'forage rapeseed', 'red clover', 'perennial ryegrass', 'annual ryegrass'],
    Never: ['berseem clover', 'forage turnip', 'purple top turnip', 'soybean', 'sunn hemp', 'winter pea', 'spring pea', 'buckwheat', 'spring cereal rye', 'teff', 'spring oats', 'sudex', 'black oats', 'pearl millet', 'japanese millet', 'sudangrass', 'spring wheat', 'cowpea', 'sunflower'],
    Seldom: ['berseem clover', 'winter pea', 'spring oats', 'forage brassica', 'mustard', 'spring barley', 'forage radish', 'phacelia'],
  },
  'Supports Mycorrhizae': {
    5: ['spring oats', 'spring cereal rye', 'black oats', 'winter cereal rye'],
    4: ['buckwheat', 'sudex', 'sudangrass', 'spring wheat', 'winter wheat', 'winter triticale', 'spring triticale', 'yellow sweetclover', 'perennial ryegrass', 'annual ryegrass'],
    3: ['berseem clover', 'winter pea', 'spring barley', 'phacelia', 'sunn hemp', 'spring pea', 'teff', 'pearl millet', 'japanese millet', 'cowpea', 'sunflower', 'balansa clover', 'hairy vetch', 'crimson clover', 'winter barley', 'red clover'],
    2: ['soybean'],
    1: ['forage brassica', 'mustard', 'forage radish', 'forage turnip', 'purple top turnip', 'forage rapeseed'],
  },
  'Frost Seed': {
    No: [
      'spring barley',
      'winter barley',
      'forage brassica',
      'buckwheat',
      'spring cereal rye',
      'winter cereal rye',
      'berseem clover',
      'cowpea',
      'japanese millet',
      'pearl millet',
      'mustard',
      'black oats',
      'spring oats',
      'spring pea',
      'winter pea',
      'phacelia',
      'sudex',
      'soybean',
      'sudangrass',
      'sunflower',
      'sunn hemp',
      'teff',
      'spring triticale',
      'winter triticale',
      'hairy vetch',
      'spring wheat',
      'winter wheat',
    ],
    Yes: [
      'balansa clover',
      'crimson clover',
      'red clover',
      'forage radish',
      'forage rapeseed',
      'annual ryegrass',
      'perennial ryegrass',
      'yellow sweetclover',
      'forage turnip',
      'purple top turnip',
    ],
  },
  'Seed Price Per lb': {
    3: ['yellow sweetclover', 'berseem clover', 'winter pea', 'phacelia', 'sunn hemp', 'spring pea', 'teff', 'cowpea', 'sunflower', 'balansa clover', 'crimson clover', 'red clover', 'soybean'],
    2: ['forage brassica', 'mustard', 'forage radish', 'forage turnip', 'forage rapeseed', 'black oats', 'buckwheat', 'sudangrass', 'spring wheat', 'winter wheat', 'perennial ryegrass', 'annual ryegrass', 'pearl millet', 'japanese millet', 'hairy vetch'],
    1: ['purple top turnip', 'spring oats', 'spring cereal rye', 'winter cereal rye', 'sudex', 'winter triticale', 'spring triticale', 'spring barley', 'winter barley'],
  },
  'Aerial Seed': {
    5: [],
    4: [],
    3: [],
    2: [],
    1: [],
  },
  'Chemical at Flowering': {
    5: ['purple top turnip', 'spring oats', 'spring cereal rye', 'winter cereal rye', 'sudex', 'winter triticale', 'spring triticale', 'spring barley', 'winter barley', 'forage brassica', 'mustard', 'forage radish', 'forage turnip', 'forage rapeseed', 'black oats', 'buckwheat', 'sudangrass', 'spring wheat', 'winter wheat', 'perennial ryegrass', 'annual ryegrass', 'pearl millet', 'japanese millet', 'hairy vetch', 'yellow sweetclover', 'berseem clover', 'winter pea', 'phacelia', 'sunn hemp', 'spring pea', 'teff', 'cowpea', 'sunflower', 'balansa clover', 'crimson clover', 'red clover', 'soybean'],
    4: [],
    3: [],
    2: [],
    1: [],
  },
  'Chemical at Vegetative': {
    5: ['spring oats', 'spring cereal rye', 'winter cereal rye', 'sudex', 'winter triticale', 'spring triticale', 'spring barley', 'winter barley', 'mustard', 'forage rapeseed', 'black oats', 'buckwheat', 'sudangrass', 'spring wheat', 'winter wheat', 'perennial ryegrass', 'pearl millet', 'japanese millet', 'yellow sweetclover', 'winter pea', 'phacelia', 'sunn hemp', 'spring pea', 'teff', 'cowpea', 'sunflower', 'soybean'],
    4: ['purple top turnip', 'forage brassica', 'forage radish', 'forage turnip', 'hairy vetch', 'balansa clover'],
    3: ['annual ryegrass', 'berseem clover', 'crimson clover', 'red clover'],
    2: [],
    1: [],
  },
  'Freezing at Flowering': {
    5: ['spring cereal rye', 'sudex', 'spring barley', 'mustard', 'black oats', 'buckwheat', 'sudangrass', 'pearl millet', 'japanese millet', 'winter pea', 'sunn hemp', 'spring pea', 'teff', 'cowpea', 'sunflower', 'soybean', 'purple top turnip', 'forage brassica', 'forage radish', 'forage turnip'],
    4: ['spring oats', 'spring triticale', 'forage rapeseed', 'spring wheat', 'yellow sweetclover', 'phacelia', 'hairy vetch', 'annual ryegrass', 'berseem clover'],
    3: ['spring oats', 'winter cereal rye', 'winter barley', 'balansa clover'],
    2: ['winter triticale', 'winter wheat', 'perennial ryegrass'],
    1: ['crimson clover', 'red clover'],
  },
  'Freezing at Vegetative': {
    5: ['sudex', 'buckwheat', 'sudangrass', 'pearl millet', 'japanese millet', 'sunn hemp', 'teff', 'cowpea', 'sunflower', 'soybean', 'phacelia'],
    4: ['black oats', 'forage radish', 'spring oats', 'berseem clover'],
    3: ['spring oats', 'spring cereal rye', 'spring barley', 'mustard', 'purple top turnip', 'forage turnip', 'spring triticale'],
    2: ['crimson clover', 'winter pea', 'spring pea', 'forage brassica', 'forage rapeseed', 'spring wheat', 'yellow sweetclover', 'annual ryegrass', 'winter barley', 'balansa clover', 'perennial ryegrass'],
    1: ['red clover', 'hairy vetch', 'winter cereal rye', 'winter triticale', 'winter wheat'],
  },
  'Mow at Flowering': {
    5: ['winter triticale', 'winter wheat', 'sudex', 'buckwheat', 'sudangrass', 'pearl millet', 'japanese millet', 'sunn hemp', 'cowpea', 'sunflower', 'soybean', 'phacelia', 'spring oats', 'black oats', 'forage radish', 'spring barley', 'mustard', 'purple top turnip', 'forage turnip', 'spring triticale', 'winter pea', 'spring pea', 'forage brassica', 'forage rapeseed', 'spring wheat', 'yellow sweetclover', 'winter barley'],
    4: ['hairy vetch', 'winter cereal rye', 'spring cereal rye'],
    3: ['red clover', 'berseem clover', 'crimson clover', 'balansa clover'],
    2: ['teff'],
    1: ['annual ryegrass', 'perennial ryegrass'],
  },
  'Roller-Crimp at Flowering': {
    5: ['winter triticale', 'winter wheat', 'buckwheat', 'pearl millet', 'japanese millet', 'sunn hemp', 'spring oats', 'black oats', 'spring barley', 'spring triticale', 'spring wheat', 'winter barley', 'hairy vetch', 'winter cereal rye', 'spring cereal rye', 'crimson clover'],
    4: [],
    3: ['mustard', 'winter pea', 'spring pea', 'forage rapeseed', 'red clover'],
    2: [],
    1: ['annual ryegrass', 'perennial ryegrass', 'sudex', 'sudangrass', 'cowpea', 'sunflower', 'soybean', 'phacelia', 'forage radish', 'purple top turnip', 'forage turnip', 'forage brassica', 'yellow sweetclover', 'berseem clover', 'balansa clover', 'teff'],
  },
  'Tillage at Flowering': {
    5: ['cowpea', 'berseem clover', 'balansa clover', 'buckwheat', 'crimson clover'],
    4: ['soybean', 'purple top turnip', 'mustard', 'winter pea', 'spring pea', 'forage rapeseed'],
    3: ['forage radish', 'forage turnip', 'forage brassica'],
    2: ['annual ryegrass', 'perennial ryegrass', 'pearl millet', 'japanese millet'],
    1: ['sudex', 'sudangrass', 'sunflower', 'phacelia', 'yellow sweetclover', 'teff', 'winter triticale', 'winter wheat', 'sunn hemp', 'spring oats', 'black oats', 'spring barley', 'spring triticale', 'spring wheat', 'winter barley', 'hairy vetch', 'winter cereal rye', 'spring cereal rye', 'red clover'],
  },
  'Tillage at Vegetative': {
    5: ['cowpea', 'berseem clover', 'balansa clover', 'buckwheat'],
    4: ['crimson clover', 'soybean', 'purple top turnip', 'mustard', 'winter pea', 'spring pea', 'forage rapeseed'],
    3: ['forage radish', 'forage turnip', 'forage brassica'],
    2: ['annual ryegrass', 'perennial ryegrass', 'pearl millet', 'japanese millet'],
    1: ['sudex', 'sudangrass', 'sunflower', 'phacelia', 'yellow sweetclover', 'teff', 'winter triticale', 'winter wheat', 'sunn hemp', 'spring oats', 'black oats', 'spring barley', 'spring triticale', 'spring wheat', 'winter barley', 'hairy vetch', 'winter cereal rye', 'spring cereal rye', 'red clover'],
  },
};
