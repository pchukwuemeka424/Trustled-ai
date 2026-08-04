import { Arrow } from "./ui";

export function ContactForm() {
  return (
    <div className="form-card reveal" data-delay="1">
      <form
        name="contact"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        action="/thank-you"
      >
        <input type="hidden" name="form-name" value="contact" />
        <p className="visually-hidden" aria-hidden="true">
          <label>
            Do not fill this in if you are human:{" "}
            <input name="bot-field" />
          </label>
        </p>
        <div className="field-row">
          <div className="field">
            <label htmlFor="name">Your name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="field">
            <label htmlFor="organisation">Your organisation</label>
            <input type="text" id="organisation" name="organisation" />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label htmlFor="sector">Sector</label>
            <select id="sector" name="sector" defaultValue="">
              <option value="" disabled>
                Select a sector
              </option>
              <option>Business</option>
              <option>University</option>
              <option>Public sector</option>
              <option>Financial services</option>
              <option>Healthcare</option>
              <option>Professional services</option>
              <option>SME</option>
              <option>Other</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="email">Your email</label>
            <input type="email" id="email" name="email" required />
          </div>
        </div>
        <div className="field">
          <label htmlFor="interest">What you are interested in</label>
          <select id="interest" name="interest" defaultValue="">
            <option value="" disabled>
              Select an option
            </option>
            <option>AI Governance Advisory</option>
            <option>AI Solutions & Automation Services</option>
            <option>GARIL AI</option>
            <option>ASAT</option>
            <option>AI Literacy Workshops</option>
            <option>AI GRC Practitioner Programme</option>
            <option>Other</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="situation">A few lines about your situation</label>
          <textarea id="situation" name="situation" required />
        </div>
        <button type="submit" className="btn" style={{ width: "100%", justifyContent: "center" }}>
          Send message <Arrow />
        </button>
        <p className="form-note">
          Submissions are handled by Netlify Forms and reach a person. We
          respond within two working days.
        </p>
      </form>
    </div>
  );
}
