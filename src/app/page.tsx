"use client";

import { useEffect, useState } from "react";

type CheckoutStage = "cart" | "checkout" | "confirmed";
type DemoScenario = "healthy" | "payment-overlay" | "stuck-payment" | "client-error";

function scenarioFromUrl(): DemoScenario {
  if (typeof window === "undefined") return "payment-overlay";
  const value = new URLSearchParams(window.location.search).get("scenario");
  if (value === "healthy" || value === "payment-overlay" || value === "stuck-payment" || value === "client-error") return value;
  return "payment-overlay";
}

export default function Storefront() {
  const [stage, setStage] = useState<CheckoutStage>("cart");
  const [scenario] = useState<DemoScenario>(scenarioFromUrl);
  const [paymentPending, setPaymentPending] = useState(false);

  useEffect(() => {
    if (stage === "checkout" && scenario === "client-error") {
      console.error("Reflex demo: checkout client hydration error");
    }
  }, [scenario, stage]);

  if (stage === "confirmed") {
    return (
      <main className="storefront">
        <section className="confirmation" aria-live="polite">
          <span className="confirmation__icon">✓</span>
          <p className="eyebrow">Order complete</p>
          <h1>Your order is confirmed.</h1>
          <p>We’ll send a receipt and delivery updates shortly.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="storefront">
      <header className="brand"><span className="brand__mark">H</span><span>Hearth &amp; Home</span></header>
      {stage === "cart" ? (
        <section className="cart" aria-labelledby="cart-title">
          <p className="eyebrow">Your cart</p>
          <h1 id="cart-title">Make room for good mornings.</h1>
          <article className="product-card">
            <div className="product-card__image" aria-hidden="true">☕</div>
            <div><h2>Stoneware morning mug</h2><p>Oat · 12 fl oz</p><strong>$24.00</strong></div>
          </article>
          <div className="cart__total"><span>Total</span><strong>$24.00</strong></div>
          <button className="primary-action" type="button" onClick={() => setStage("checkout")}>Checkout</button>
        </section>
      ) : (
        <section className="checkout" aria-labelledby="checkout-title">
          <div><p className="eyebrow">Secure checkout</p><h1 id="checkout-title">Almost there.</h1><p className="checkout__intro">Your delivery and payment details are ready to review.</p></div>
          <div className="payment-card"><span className="payment-card__label">Payment</span><span>•••• 4242</span></div>
          <div className="checkout__payment-area">
            <button
              className="primary-action"
              type="button"
              disabled={paymentPending}
              onClick={() => scenario === "stuck-payment" ? setPaymentPending(true) : setStage("confirmed")}
            >
              {paymentPending ? "Processing payment…" : "Pay now · $24.00"}
            </button>
            {paymentPending ? <p className="payment-status" role="status">Still processing your payment…</p> : null}
            <aside className={`order-summary${scenario === "payment-overlay" ? " order-summary--overlay" : ""}`}><span>Order summary</span><strong>$24.00</strong><small>1 item · Standard delivery</small></aside>
          </div>
          <button className="back-link" type="button" onClick={() => setStage("cart")}>Back to cart</button>
        </section>
      )}
    </main>
  );
}
