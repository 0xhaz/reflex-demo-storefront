# Reflex demo storefront

The controlled checkout target for the Reflex QA demo.

## Run locally

```bash
pnpm install
pnpm build
pnpm start
```

The `main` branch must always complete checkout. The regression PR will intentionally introduce a mobile-only stacking-context bug that covers **Pay now** without removing it from the DOM.
