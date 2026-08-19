// The two supplied cloud cutouts, in one place.
//
// light-cloud carries blue-grey shading, so it holds up against pale
// backgrounds. dark-cloud is flatter and brighter, which is what reads against
// deep blue. Every cloud layer on the page picks whichever suits the band it
// sits in.

export const CLOUD_ART = {
  light: { src: "/light-cloud.png", w: 876, h: 509 },
  dark: { src: "/dark-cloud.png", w: 768, h: 401 },
} as const;

export type CloudArt = keyof typeof CLOUD_ART;
