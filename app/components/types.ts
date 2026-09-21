export type FlowerType = 'sunflower' | 'tulip' | 'daisy' | 'rose';

export interface FlowerMeta {
  id: FlowerType;
  name: string;
  scientificName: string;
  tagline: string;
  symbolism: string;
  icon: string;
  accentColor: string;
  glowColor: string;
}

export const FLOWER_OPTIONS: FlowerMeta[] = [
  {
    id: 'sunflower',
    name: 'Girasol Radiante',
    scientificName: 'Helianthus annuus',
    tagline: 'Luz, vitalidad y lealtad',
    symbolism: 'Símbolo de alegría incondicional, admiración y adoración eterna.',
    icon: '🌻',
    accentColor: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.45)',
  },
  {
    id: 'tulip',
    name: 'Tulipán de Seda',
    scientificName: 'Tulipa gesneriana',
    tagline: 'Elegancia, ternura y renacer',
    symbolism: 'Expresa afecto sincero, admiración refinada y luz compartida.',
    icon: '🌷',
    accentColor: '#facc15',
    glowColor: 'rgba(250, 204, 21, 0.45)',
  },
  {
    id: 'daisy',
    name: 'Margarita Silvestre',
    scientificName: 'Bellis perennis',
    tagline: 'Inocencia, pureza y dicha',
    symbolism: 'Alegría espontánea, nuevos comienzos y amistad entrañable.',
    icon: '🌼',
    accentColor: '#fde047',
    glowColor: 'rgba(253, 224, 71, 0.45)',
  },
  {
    id: 'rose',
    name: 'Rosa Dorada',
    scientificName: 'Rosa lutea',
    tagline: 'Calidez, fascinación y magia',
    symbolism: 'Amor cálido, compañerismo profundo y promesas luminosas.',
    icon: '🌹',
    accentColor: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.45)',
  },
];
