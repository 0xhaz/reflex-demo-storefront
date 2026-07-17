"use client";

import { useState } from "react";

type CheckoutStage = "cart" | "checkout" | "confirmed";

export default function Storefront() {
  const [stage, setStage] = useState<CheckoutStage>("cart");

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
            <aside className="order-summary"><span>Order summary</span><strong>$24.00</strong><small>1 item · Standard delivery</small></aside>
            <button className="primary-action" type="button" onClick={() => setStage("confirmed")}>Pay now · $24.00</button>
          </div>
          <button className="back-link" type="button" onClick={() => setStage("cart")}>Back to cart</button>
        </section>
      )}
    </main>
  );
}
