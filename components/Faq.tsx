"use client";

import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqProps = {
  items: FaqItem[];
};

export function Faq({ items }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="faq">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const answerId = `faq-answer-${index}`;

        return (
          <div
            key={item.question}
            className={`faq-item${isOpen ? " open" : ""}`}
          >
            <h3>
              <button
                className="faq-q"
                type="button"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                {item.question}
              </button>
            </h3>
            <div id={answerId} className="faq-a" hidden={!isOpen}>
              <div className="faq-a-inner">
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export const homeFaqItems: FaqItem[] = [
  {
    question: "What happens on the first conversation?",
    answer:
      "A 30-minute conversation with no pitch deck. We ask about your objectives, where AI is already in use, and whether you need governance advisory, AI solutions and automation, or professional training. You leave with a clear sense of whether we can help and what a sensible next step looks like.",
  },
  {
    question: "Do you only advise, or do you also build?",
    answer:
      "Both. We advise organisations on AI governance, design AI-powered software and automation solutions, and develop governed platforms like GARIL AI. Governance, technology and capability building sit together rather than as separate engagements that never connect.",
  },
  {
    question: "Which frameworks and regulations do you work with?",
    answer:
      "Our advisory work aligns with ISO/IEC 42001, the NIST AI Risk Management Framework, the EU AI Act, UK Pro-Innovation AI Regulatory Principles, and Nigeria's NDPA and National AI Strategy. We apply the parts that matter to your organisation rather than delivering generic templates.",
  },
  {
    question: "Who is your training for?",
    answer:
      "AI Literacy Workshops help universities and businesses build AI-ready teams. The AI GRC Practitioner Programme is designed for governance, risk, compliance, cybersecurity, audit, privacy and IT professionals who want practical AI GRC skills — including people transitioning into the field.",
  },
  {
    question: "Where do you work?",
    answer:
      "We work with organisations across the UK, Nigeria and Europe. Engagements are tailored to your size, sector and AI maturity, whether you are preparing for regulation, building governed AI products, or developing capability across your workforce.",
  },
];
