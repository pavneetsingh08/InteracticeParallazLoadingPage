import { useState } from "react";
import ParallaxSection from "@/components/ParallaxSection";
import Starfield from "@/components/Starfield";
import Particles from "@/components/Particles";

type Status = "idle" | "sending" | "sent";

/**
 * Contact — a glass form over a starfield. Submission is simulated with a
 * short delay then shows a confirmation state. Includes a decorative planet
 * that parallaxes behind the form.
 */
export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1100);
  };

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  return (
    <ParallaxSection
      id="contact"
      className="bg-contact section-pad"
      layers={[
        { selector: ".ct-planet", speed: 0.6 },
        { selector: ".ct-bg-glow", speed: -0.3 },
      ]}
    >
      <Starfield className="ct-stars" density={0.6} />
      <Particles className="ct-particles" count={22} hues={[190, 200]} />
      <div className="ct-bg-glow" aria-hidden="true" />
      <div className="planet planet--saturn ct-planet" aria-hidden="true">
        <div className="saturn-ring" />
      </div>

      <div className="container ct-layout">
        <div className="ct-intro reveal">
          <span className="eyebrow">07 — Contact</span>
          <h2 className="section-title">Ready to <span className="grad">launch?</span></h2>
          <p className="section-lead">
            Whether you want to collaborate, ask a question, or just say hello
            from across the galaxy — drop us a line. We read every message.
          </p>

          <ul className="ct-details">
            <li>
              <span className="ct-details__l">Mission Control</span>
              <span className="ct-details__v">Cape Cosmos, FL 32920</span>
            </li>
            <li>
              <span className="ct-details__l">Comms</span>
              <span className="ct-details__v">hello@aetherorbit.space</span>
            </li>
            <li>
              <span className="ct-details__l">Frequency</span>
              <span className="ct-details__v">Mon–Fri, 09:00–18:00 UTC</span>
            </li>
          </ul>
        </div>

        <form className="ct-form glass reveal" onSubmit={submit}>
          {status === "sent" ? (
            <div className="ct-success">
              <div className="ct-success__icon">✓</div>
              <h3>Transmission received</h3>
              <p>Thanks, {form.name || "traveler"}. We'll get back to you at lightspeed.</p>
              <button className="btn" type="button" onClick={() => { setStatus("idle"); setForm({ name: "", email: "", message: "" }); }}>
                Send another
              </button>
            </div>
          ) : (
            <>
              <div className="ct-field">
                <label htmlFor="ct-name">Name</label>
                <input id="ct-name" type="text" required placeholder="Your name" {...field("name")} />
              </div>
              <div className="ct-field">
                <label htmlFor="ct-email">Email</label>
                <input id="ct-email" type="email" required placeholder="you@galaxy.com" {...field("email")} />
              </div>
              <div className="ct-field">
                <label htmlFor="ct-msg">Message</label>
                <textarea id="ct-msg" rows={5} required placeholder="Tell us about your mission..." {...field("message")} />
              </div>
              <button className="btn btn--primary ct-submit" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Transmitting..." : "Send Transmission"}
                {status !== "sending" && <span className="arrow">→</span>}
              </button>
            </>
          )}
        </form>
      </div>

      <footer className="ct-footer">
        <div className="container ct-footer__inner">
          <span className="ct-footer__brand">Aether·Orbit</span>
          <span className="ct-footer__meta">Journey Through Space · {new Date().getFullYear()}</span>
          <span className="ct-footer__cred">Built with React, Vite & GSAP</span>
        </div>
      </footer>
    </ParallaxSection>
  );
}
