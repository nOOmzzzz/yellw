export type FlowerType = 'bouquet' | 'tulips' | 'sunflower' | 'wildflower';

export interface FlowerMeta {
  id: FlowerType;
  name: string;
  shortName: string;
  scientificName: string;
  tagline: string;
  symbolism: string;
  accentColor: string;
  glowColor: string;
}

export const FLOWER_OPTIONS: FlowerMeta[] = [
  {
    id: 'bouquet',
    name: 'Ramo de Flores Amarillas',
    shortName: 'Clásico',
    scientificName: 'Bouquet de Primavera',
    tagline: 'El clásico ramo de regalo con envoltura y lazo',
    symbolism: 'Inspirado en la tradición del 21 de septiembre: promesa de afecto, luz y nuevos comienzos.',
    accentColor: '#facc15',
    glowColor: 'rgba(250, 204, 21, 0.28)',
  },
  {
    id: 'tulips',
    name: 'Ramo de Tulipanes Amarillos',
    shortName: 'Tulipanes',
    scientificName: 'Tulipa gesneriana aurea',
    tagline: 'Elegancia pura, afecto sincero y calidez',
    symbolism: 'Símbolo de amor alegre, ternura y el renacer más fino de la primavera.',
    accentColor: '#fde047',
    glowColor: 'rgba(253, 224, 71, 0.28)',
  },
  {
    id: 'sunflower',
    name: 'Ramo de Girasoles',
    shortName: 'Girasoles',
    scientificName: 'Helianthus annuus',
    tagline: 'Energía solar radiante y admiración eterna',
    symbolism: 'Símbolo del sol de primavera, vitalidad serena y fidelidad.',
    accentColor: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.28)',
  },
  {
    id: 'wildflower',
    name: 'Ramillete Silvestre',
    shortName: 'Silvestre',
    scientificName: 'Flores de Campo',
    tagline: 'La esencia silvestre y natural de la primavera',
    symbolism: 'Inocencia, espontaneidad, ternura y el deseo de florecer juntos.',
    accentColor: '#fef08a',
    glowColor: 'rgba(254, 240, 138, 0.28)',
  },
];

export interface BuildStepInfo {
  step: number;
  title: string;
  action: string;
}

export const BUILD_STEPS: BuildStepInfo[] = [
  {
    step: 0,
    title: 'Semilla de Luz',
    action: 'Toca el núcleo de luz para dar vida al ramo',
  },
  {
    step: 1,
    title: 'Tallos Principales',
    action: 'Toca para hacer brotar los tallos frescos',
  },
  {
    step: 2,
    title: 'Hojas y Follaje',
    action: 'Toca para desplegar el follaje verde',
  },
  {
    step: 3,
    title: 'Envoltorio y Lazo',
    action: 'Toca para abrazar el ramo con su papel y cinta',
  },
  {
    step: 4,
    title: 'Apertura Floral',
    action: 'Toca para posicionar las flores amarillas',
  },
  {
    step: 5,
    title: 'Ramo en Plenitud',
    action: 'El ramo floreció por completo para ti',
  },
];
