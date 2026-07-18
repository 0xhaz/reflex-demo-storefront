# Reflex demo storefront

The controlled checkout target for the Reflex QA demo.

## Run locally

```bash
pnpm install
pnpm build
pnpm start
```

The `main` branch must always complete checkout. The regression PR will intentionally introduce a mobile-only stacking-context bug that covers **Pay now** without removing it from the DOM.

## Monitoring fixtures

The `main` branch remains the healthy baseline. This PR branch deliberately defaults to the mobile overlay regression. Start the app with `pnpm dev`, then use one of these URLs to select a monitoring state:

- `http://localhost:3000/?scenario=healthy` — the healthy checkout, useful for a production monitor pass.
- `http://localhost:3000/?scenario=payment-overlay` — an order summary covers **Pay now** on mobile.
- `http://localhost:3000/?scenario=stuck-payment` — **Pay now** stays in a loading state forever.
- `http://localhost:3000/?scenario=client-error` — checkout completes but emits a client-side error for telemetry testing.
