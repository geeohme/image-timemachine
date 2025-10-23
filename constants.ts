import { HistoricalScene } from './types';

export const HISTORICAL_SCENES: HistoricalScene[] = [
  {
    id: 'ancient_rome',
    name: 'Ancient Rome',
    imageUrl: 'https://picsum.photos/seed/rome/400/400',
    prompt:
      'Edit this photo to place the person into ancient Rome. They should be dressed as a Roman citizen in a toga. The background should be a bustling Roman street with classical architecture like the Colosseum or the Forum. The lighting should be bright and sunny, and the image style should resemble a classical painting.',
  },
  {
    id: 'victorian_era',
    name: 'Victorian Era',
    imageUrl: 'https://picsum.photos/seed/victorian/400/400',
    prompt:
      "Transform this photo to look like a sepia-toned photograph from the Victorian era. The person should be dressed in elegant Victorian attire. The background should be an ornate, vintage room or a classic Victorian street scene. The overall image should have a historic, aged feel.",
  },
  {
    id: 'roaring_twenties',
    name: 'Roaring Twenties',
    imageUrl: 'https://picsum.photos/seed/twenties/400/400',
    prompt:
      "Place the person in this photo into the Roaring Twenties. They should be styled as a flapper or a dapper gentleman at a lively jazz club or an Art Deco party. The image should be black and white, with high contrast and a glamorous, energetic feel.",
  },
  {
    id: 'moon_landing',
    name: 'Moon Landing',
    imageUrl: 'https://picsum.photos/seed/moon/400/400',
    prompt:
      'Edit this photo to place the person onto the surface of the moon, as if they were an astronaut in the 1969 moon landing. The person should be wearing a vintage astronaut suit. The background should be the lunar surface with the Earth in the distance. The lighting should be harsh and the photo style should resemble a vintage photograph from that era.',
  },
  {
    id: 'wild_west',
    name: 'Wild West',
    imageUrl: 'https://picsum.photos/seed/west/400/400',
    prompt:
      "Transport the person in this photo to the American Wild West. They should be dressed as a cowboy or cowgirl. The background should be a dusty frontier town or a vast desert landscape at sunset. The image should have a rugged, cinematic feel, similar to a classic Western film.",
  },
  {
    id: 'cyberpunk_future',
    name: 'Cyberpunk Future',
    imageUrl: 'https://picsum.photos/seed/cyberpunk/400/400',
    prompt:
      "Reimagine the person in this photo as a character in a neon-lit cyberpunk future. They should have futuristic clothing and cybernetic enhancements. The background should be a rainy, futuristic cityscape with towering skyscrapers and glowing holograms. The image should have a dark, moody atmosphere with vibrant neon colors.",
  },
  {
    id: 'custom',
    name: 'Make My Own',
    imageUrl: 'https://picsum.photos/id/661/200/200',
    prompt: 'A custom user-defined scene.', // This prompt is a placeholder
  },
];
