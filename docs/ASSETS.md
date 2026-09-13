# Rustbound asset provenance

## Existing brand artwork

The approved artwork was supplied locally in `D:/RustServer/server/carbon/data/RustboundUI/` and reused for this project:

| Website asset | Source |
| --- | --- |
| `src/assets/brand/rustbound-logo.webp` | `rustbound_logo.png`, approved logo with original RB symbol and tagline. |
| `src/assets/brand/founders.webp` and `public/favicon.png` | Crops of the same original RB symbol; no replacement logo was designed. |
| `src/assets/textures/steel.webp` | `reference_card_texture.png`. |
| `src/assets/icons/supporter.webp` | `kit_supporter_v1.png`. |
| `src/assets/icons/loyalty.webp` | `kit_loyalty_v1.png`. |
| `src/assets/icons/starter.webp` | `kit_starter_v1.png`; available for future content. |

## Cinematic background

The website hero is a text-free outpaint of the existing `hero_banner.png`, guided by the approved `D:/Downloads2/meniusvmock.png` reference. It was created in one built-in ImageGen edit request, preserving the sunset, fir forest and rusted spherical industrial structure. No unrelated stock screenshot or new logo was introduced.

The generated master is `D:/RustServer/output/imagegen/rustbound-website-hero.png` (1672 × 941). Its exact prompt and original generation location are preserved in `imagegen-provenance.md` alongside this file.

`rustbound-hero.webp` is the full scene; `compound.webp` and `coast.webp` are mechanical crops used on news cards and supporting panels. `scripts/prepare-assets.py` records the local exports. It requires Pillow and the original source files only when regenerating assets; ordinary builds use the committed WebP files and do not need those source paths.

## Typography and icons

- Barlow Condensed and Inter are bundled locally through Fontsource; their SIL Open Font License notices ship in `public/licenses/`.
- Interface pictograms use Lucide React, with its ISC license notice included. The Discord pictogram identifies the Discord destination.
- Subtle grain, borders, overlays, highlights and hover treatments are implemented in CSS.
