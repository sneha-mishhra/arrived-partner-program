The hero clouds use `public/light-cloud.png` and `public/dark-cloud.png`.

- `light-cloud.png` carries blue-grey shading, so it holds up against the pale
  lower half of the sky gradient.
- `dark-cloud.png` is flatter and brighter, which is what reads against the
  deep blue at the top.

Layer positions, sizes, opacities, and fall rates live in the `LAYERS` array in
`components/v2/SkyHero.tsx`. Each layer picks its art with `art: "light"` or
`art: "dark"`. To add or move a cloud, edit that array; nothing else needs to
change.

The band further down the page (behind the design jams) is a separate layer,
`components/v2/Sky.tsx`, which also uses these cutouts.
