// composables/lakes-data.ts

export interface Lake { 
  name: string; 
  lat: number; 
  lng: number; 
  transparency?: number;
  temperature?: number;
  conductivity?: number;
  waterlevel?: number;
  pathogens?: string;
}

// Translation mappings
export const lakeTranslations: Record<string, Record<string, string>> = {
  // Petropavl lakes
  'Pestroe Lake': {
    en: 'Pestroe Lake',
    ru: 'Озеро Пестрое',
    kk: 'Пестрое көлі'
  },
  'Beloe Lake': {
    en: 'Beloe Lake',
    ru: 'Озеро Белое',
    kk: 'Белое көлі'
  },
  'Gorkoe Lake': {
    en: 'Gorkoe Lake',
    ru: 'Озеро Горькое',
    kk: 'Горькое көлі'
  },
  'Poganka Lake': {
    en: 'Poganka Lake',
    ru: 'Озеро Поганка',
    kk: 'Поганка көлі'
  },
  'Dickoe Lake': {
    en: 'Dickoe Lake',
    ru: 'Озеро Дикое',
    kk: 'Дикое көлі'
  },
  'Kishtibish 1': {
    en: 'Kishtibish 1',
    ru: 'Киштибиш 1',
    kk: 'Киштибиш 1'
  },
  'Kishtibish 2': {
    en: 'Kishtibish 2',
    ru: 'Киштибиш 2',
    kk: 'Киштибиш 2'
  },
  'Kishtibish 3': {
    en: 'Kishtibish 3',
    ru: 'Киштибиш 3',
    kk: 'Киштибиш 3'
  },
  
  // Astana lakes
  'Lake Taldykol': {
    en: 'Lake Taldykol',
    ru: 'Озеро Талдыколь',
    kk: 'Талдыкөл көлі'
  },
  'Ishim River (Central)': {
    en: 'Ishim River (Central)',
    ru: 'Река Ишим (Центральная)',
    kk: 'Есіл өзені (Орталық)'
  },
  'Lake Zhalpaksor': {
    en: 'Lake Zhalpaksor',
    ru: 'Озеро Жалпаксор',
    kk: 'Жалпақсор көлі'
  },
  'Lake Burabay (Borovoe)': {
    en: 'Lake Burabay (Borovoe)',
    ru: 'Озеро Бурабай (Боровое)',
    kk: 'Бурабай көлі (Боровое)'
  },
  'Lake Shchuchye': {
    en: 'Lake Shchuchye',
    ru: 'Озеро Щучье',
    kk: 'Шұбар көлі'
  },
  'Ishim River (Northern)': {
    en: 'Ishim River (Northern)',
    ru: 'Река Ишим (Северная)',
    kk: 'Есіл өзені (Солтүстік)'
  },
  
  // Almaty lakes
  'Big Almaty Lake': {
    en: 'Big Almaty Lake',
    ru: 'Большое Алматинское озеро',
    kk: 'Үлкен Алматы көлі'
  },
  'Kolsai Lake 1': {
    en: 'Kolsai Lake 1',
    ru: 'Озеро Кольсай 1',
    kk: 'Көлсай көлі 1'
  },
  'Kaindy Lake': {
    en: 'Kaindy Lake',
    ru: 'Озеро Каинды',
    kk: 'Қайыңды көлі'
  },
  'Lake Issyk': {
    en: 'Lake Issyk',
    ru: 'Озеро Иссык',
    kk: 'Есік көлі'
  },
  'Kapchagay Reservoir': {
    en: 'Kapchagay Reservoir',
    ru: 'Капчагайское водохранилище',
    kk: 'Қапшағай бөгені'
  },
  'Kolsai Lake 2': {
    en: 'Kolsai Lake 2',
    ru: 'Озеро Кольсай 2',
    kk: 'Көлсай көлі 2'
  },
  'Bartogay Reservoir': {
    en: 'Bartogay Reservoir',
    ru: 'Бартогайское водохранилище',
    kk: 'Бартоғай бөгені'
  },
  'Turgen Gorge Lake': {
    en: 'Turgen Gorge Lake',
    ru: 'Озеро в ущелье Тургень',
    kk: 'Түрген шатқалы көлі'
  }
};

// Helper function to get translated lake name
export const getTranslatedLakeName = (lakeName: string, language: string = 'en'): string => {
  return lakeTranslations[lakeName]?.[language] || lakeName;
};

// Your lakes data stays EXACTLY the same as before!
export const lakesPetropavl: Lake[] = [
  { name: 'Pestroe Lake', lat: 54.836699, lng: 69.111328, transparency: 1.2, temperature: 17.4, conductivity: 420, waterlevel: 1.8, pathogens: 'Low' },
  { name: 'Beloe Lake', lat: 54.927154, lng: 69.254322, transparency: 1.8, temperature: 16.1, conductivity: 380, waterlevel: 2.4, pathogens: 'Medium' },
  { name: 'Gorkoe Lake', lat: 54.947573, lng: 68.951122, transparency: 0.9, temperature: 15.8, conductivity: 610, waterlevel: 1.2, pathogens: 'Low' },
  { name: 'Poganka Lake', lat: 54.921205, lng: 69.053476, transparency: 0.6, temperature: 18.2, conductivity: 700, waterlevel: 0.9, pathogens: 'High' },
  { name: 'Dickoe Lake', lat: 54.840156, lng: 69.131957, transparency: 1.4, temperature: 17.0, conductivity: 460, waterlevel: 1.7, pathogens: 'Medium' },
  { name: 'Kishtibish 1', lat: 54.970375, lng: 69.180688, transparency: 2.1, temperature: 14.9, conductivity: 330, waterlevel: 2.1, pathogens: 'Low' },
  { name: 'Kishtibish 2', lat: 54.960860, lng: 69.162569, transparency: 1.6, temperature: 15.3, conductivity: 350, waterlevel: 1.5, pathogens: 'Low' },
  { name: 'Kishtibish 3', lat: 54.954006, lng: 69.179125, transparency: 2.3, temperature: 15.7, conductivity: 370, waterlevel: 1.9, pathogens: 'Medium' },
];

export const lakesAstana: Lake[] = [
  {
    name: 'Lake Taldykol',
    lat: 51.1589,
    lng: 71.3986,
    transparency: 1.2,
    temperature: 15.8,
    conductivity: 680,
    waterlevel: 1.8,
    pathogens: 'Medium'
  },
  {
    name: 'Ishim River (Central)',
    lat: 51.1283,
    lng: 71.4302,
    transparency: 0.8,
    temperature: 16.2,
    conductivity: 420,
    waterlevel: 3.5,
    pathogens: 'Medium'
  },
  {
    name: 'Lake Zhalpaksor',
    lat: 51.2456,
    lng: 71.5128,
    transparency: 2.1,
    temperature: 14.9,
    conductivity: 890,
    waterlevel: 2.2,
    pathogens: 'Low'
  },
  {
    name: 'Lake Burabay (Borovoe)',
    lat: 53.0844,
    lng: 70.2917,
    transparency: 4.2,
    temperature: 12.8,
    conductivity: 180,
    waterlevel: 8.5,
    pathogens: 'Low'
  },
  {
    name: 'Lake Shchuchye',
    lat: 52.9411,
    lng: 70.1983,
    transparency: 3.8,
    temperature: 13.2,
    conductivity: 210,
    waterlevel: 7.2,
    pathogens: 'Low'
  },
  {
    name: 'Ishim River (Northern)',
    lat: 51.4567,
    lng: 71.6389,
    transparency: 1.1,
    temperature: 15.5,
    conductivity: 380,
    waterlevel: 4.2,
    pathogens: 'Medium'
  }
];

export const lakesAlmaty: Lake[] = [
  {
    name: 'Big Almaty Lake',
    lat: 43.0500,
    lng: 76.9825,
    transparency: 6.8,
    temperature: 8.5,
    conductivity: 95,
    waterlevel: 25.4,
    pathogens: 'Very Low'
  },
  {
    name: 'Kolsai Lake 1',
    lat: 42.9372,
    lng: 78.3978,
    transparency: 7.2,
    temperature: 9.2,
    conductivity: 110,
    waterlevel: 18.7,
    pathogens: 'Very Low'
  },
  {
    name: 'Kaindy Lake',
    lat: 42.9853,
    lng: 78.4658,
    transparency: 8.1,
    temperature: 7.8,
    conductivity: 85,
    waterlevel: 30.2,
    pathogens: 'Very Low'
  },
  {
    name: 'Lake Issyk',
    lat: 43.2333,
    lng: 77.4833,
    transparency: 3.2,
    temperature: 14.5,
    conductivity: 320,
    waterlevel: 12.8,
    pathogens: 'Low'
  },
  {
    name: 'Kapchagay Reservoir',
    lat: 43.8333,
    lng: 77.6667,
    transparency: 1.8,
    temperature: 18.2,
    conductivity: 450,
    waterlevel: 45.3,
    pathogens: 'Medium'
  },
  {
    name: 'Kolsai Lake 2',
    lat: 42.9158,
    lng: 78.4236,
    transparency: 6.5,
    temperature: 8.9,
    conductivity: 105,
    waterlevel: 22.1,
    pathogens: 'Very Low'
  },
  {
    name: 'Bartogay Reservoir',
    lat: 43.5667,
    lng: 77.2500,
    transparency: 2.1,
    temperature: 16.8,
    conductivity: 380,
    waterlevel: 28.7,
    pathogens: 'Medium'
  },
  {
    name: 'Turgen Gorge Lake',
    lat: 43.1833,
    lng: 77.6000,
    transparency: 5.2,
    temperature: 11.5,
    conductivity: 150,
    waterlevel: 15.3,
    pathogens: 'Low'
  }
];

// NEW: Simple list of all lakes
export const allLakes: Lake[] = [
  ...lakesPetropavl,
  ...lakesAstana,
  ...lakesAlmaty
];

// For backward compatibility with existing lab pages
export const lakesData = lakesPetropavl;

// Simple helper for map hub
export const getLakesByCity = (city: string): Lake[] => {
  switch (city) {
    case 'petropavl': return lakesPetropavl;
    case 'astana': return lakesAstana;
    case 'almaty': return lakesAlmaty;
    default: return lakesPetropavl;
  }
};