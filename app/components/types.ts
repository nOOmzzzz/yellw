export type FlowerType = 'bouquet' | 'tulips' | 'sunflower' | 'wildflower';

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
    scientificName: 'Bouquet de Primavera',
    tagline: 'El clásico ramo de regalo con envoltura y lazo',
    symbolism: 'Inspirado en la tradición del 21 de septiembre: promesa de amor, alegría y nuevos comienzos.',
    icon: '💐',
    accentColor: '#facc15',
    glowColor: 'rgba(250, 204, 21, 0.45)',
  },
  {
    id: 'tulips',
    name: 'Ramo de Tulipanes Amarillos',
    scientificName: 'Tulipa gesneriana aurea',
    tagline: 'Elegancia pura, afecto sincero y calidez',
    symbolism: 'Símbolo de amor alegre, ternura y el renacer más fino de la primavera.',
    icon: '🌷',
    accentColor: '#fde047',
    glowColor: 'rgba(253, 224, 71, 0.45)',
  },
  {
    id: 'sunflower',
    name: 'Ramo de Girasoles',
    scientificName: 'Helianthus annuus',
    tagline: 'Energía solar radiante y admiración eterna',
    symbolism: 'Símbolo del sol de primavera, felicidad radiante y amor que siempre sigue tu luz.',
    icon: '🌻',
    accentColor: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.45)',
  },
  {
    id: 'wildflower',
    name: 'Ramillete Silvestre',
    scientificName: 'Flores de Floricienta',
    tagline: 'La magia silvestre de la canción',
    symbolism: 'Inocencia, espontaneidad, ternura y el sueño de florecer juntos.',
    icon: '✨',
    accentColor: '#fef08a',
    glowColor: 'rgba(254, 240, 138, 0.45)',
  },
];

export interface BuildStepInfo {
  step: number;
  title: string;
  action: string;
  icon: string;
}

export const BUILD_STEPS: BuildStepInfo[] = [
  {
    step: 0,
    title: 'Semilla Mágica',
    action: 'Toca la semilla dorada para iniciar el ramo',
    icon: '✨',
  },
  {
    step: 1,
    title: 'Tallos & Estructura',
    action: 'Toca para entrelazar los tallos frescos',
    icon: '🌱',
  },
  {
    step: 2,
    title: 'Follaje Verde',
    action: 'Toca para integrar el follaje y las hojas',
    icon: '🍃',
  },
  {
    step: 3,
    title: 'Envoltorio & Lazo',
    action: 'Toca para envolver el ramo con papel y cinta de satén',
    icon: '🎀',
  },
  {
    step: 4,
    title: 'Colocación Floral',
    action: 'Toca para acomodar los capullos amarillos',
    icon: '🌿',
  },
  {
    step: 5,
    title: '¡Gran Florecimiento!',
    action: '¡El ramo ha florecido para ti con todo su amor!',
    icon: '💛',
  },
];
