# CentralHub marketing sites

Two variants of the CentralHub landing site (Next.js + CSS Modules):

- `bold/` - the original voice (punchy hero and problem copy). Serve on port 3014.
- `neutral/` - identical design with softened, neutral-tone copy. Serve on port 3015.

Run either: `npm install && npm run build && npm start -- --port <port>`

Demo-form submissions land in `data/demo-requests.json` (gitignored) and are viewable at `/requests`.
