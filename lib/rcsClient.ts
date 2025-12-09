import { Pinnacle } from 'rcs-js';

export const rcsClient = new Pinnacle({
  apiKey: process.env.PINNACLE_API_KEY,
});
