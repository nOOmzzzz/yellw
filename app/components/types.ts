export type FlowerType = 'bouquet' | 'sunflower' | 'narcissus' | 'wildflower';

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
    id: 'bouquet',
    name: 'Ramo de Flores Amarillas',
    scientificName: 'Ramillete de Primavera',
    tagline: 'El clásico ramo de primavera para regalar',
    symbolism: 'Inspirado en la tradición del 21 de septiembre: promesa de amor, alegría y nuevos comienzos.',
    icon: '💐',
    accentColor: '#facc15',
    glowColor: 'rgba(250, 204, 21, 0.45)',
  },
  {
    id: 'sunflower',
    name: 'Girasol de Primavera',
    scientificName: 'Helianthus annuus',
    tagline: 'Energía solar, admiración y calidez',
    symbolism: 'Símbolo del sol de primavera, felicidad radiante y amor que siempre sigue tu luz.',
    icon: '🌻',
    accentColor: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.45)',
  },
  {
    id: 'narcissus',
    name: 'Narciso Dorado',
    scientificName: 'Narcissus pseudonarcissus',
    tagline: 'La flor insignia del inicio de la primavera',
    symbolism: 'Representa el renacer de la primavera, la esperanza, la prosperidad y la belleza.',
    icon: '🌼',
    accentColor: '#fde047',
    glowColor: 'rgba(253, 224, 71, 0.45)',
  },
  {
    id: 'wildflower',
    name: 'Margarita Silvestre',
    scientificName: 'Bellis perennis aurea',
    tagline: 'La flor amarilla de Floricienta',
    symbolism: 'Inocencia, espontaneidad, ternura y el sueño de florecer juntos.',
    icon: '✨',
    accentColor: '#fef08a',
    glowColor: 'rgba(254, 240, 138, 0.45)',
  },
];
