/**
 * Animation Hooks Usage Examples
 * 
 * This file demonstrates how to use the animation hooks in React components.
 */

import React, { useRef } from 'react';
import { useMountAnimation, useHoverAnimation } from './hooks';

/**
 * Example 1: Authentication Card Animation
 * 
 * Requirements: 5.1 - Auth card animation (y:40, opacity:0 → y:0, opacity:1, 500ms)
 */
export function AuthCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useMountAnimation(cardRef, {
    from: { y: 40, opacity: 0 },
    to: { y: 0, opacity: 1 },
    duration: 500,
  });

  return (
    <div ref={cardRef} className="auth-card">
      {children}
    </div>
  );
}

/**
 * Example 2: Input Fields with Stagger Animation
 * 
 * Requirements: 5.2 - Input stagger animation (80ms delay)
 */
export function AuthInputs({ fields }: { fields: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useMountAnimation(containerRef, {
    from: { y: 20, opacity: 0 },
    to: { y: 0, opacity: 1 },
    stagger: 80, // 80ms delay between each input
  });

  return (
    <div ref={containerRef}>
      {fields.map((field) => (
        <input key={field} className="auth-input" placeholder={field} />
      ))}
    </div>
  );
}

/**
 * Example 3: CTA Button with Delay
 * 
 * Requirements: 5.3 - CTA button animation (scale:0.96 → scale:1, 200ms delay)
 */
export function CTAButton({ children }: { children: React.ReactNode }) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useMountAnimation(buttonRef, {
    from: { scale: 0.96, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    delay: 200,
  });

  return (
    <button ref={buttonRef} className="cta-button">
      {children}
    </button>
  );
}

/**
 * Example 4: Hover Animation on Link
 * 
 * Requirements: 5.4 - Switch link hover (underline width animation, 200ms)
 */
export function SwitchLink({ children }: { children: React.ReactNode }) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useHoverAnimation(linkRef, {
    to: { scale: 1.02 },
    duration: 200,
  });

  return (
    <a ref={linkRef} href="#" className="switch-link">
      {children}
    </a>
  );
}

/**
 * Example 5: Edit Button with Hover
 * 
 * Requirements: 7.5 - Edit button hover (scale: 1.04)
 */
export function EditButton({ onClick }: { onClick: () => void }) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Mount animation
  useMountAnimation(buttonRef, {
    from: { scale: 0.95 },
    to: { scale: 1 },
  });

  // Hover animation
  useHoverAnimation(buttonRef, {
    to: { scale: 1.04 },
    duration: 200,
  });

  return (
    <button ref={buttonRef} onClick={onClick} className="edit-button">
      Edit
    </button>
  );
}

/**
 * Example 6: Approve/Reject Buttons with Hover
 * 
 * Requirements: 10.2 - Approve/reject button hover (scale: 1.04)
 */
export function ActionButtons() {
  const approveRef = useRef<HTMLButtonElement>(null);
  const rejectRef = useRef<HTMLButtonElement>(null);

  useHoverAnimation(approveRef, {
    to: { scale: 1.04 },
    duration: 200,
  });

  useHoverAnimation(rejectRef, {
    to: { scale: 1.04 },
    duration: 200,
  });

  return (
    <div className="action-buttons">
      <button ref={approveRef} className="approve-button">
        Approve
      </button>
      <button ref={rejectRef} className="reject-button">
        Reject
      </button>
    </div>
  );
}

/**
 * Example 7: Dashboard Feature Cards with Stagger
 * 
 * Requirements: 6.2 - Feature cards stagger (y:30, opacity:0.9 → y:0, opacity:1, 120ms)
 */
export function FeatureCards({ cards }: { cards: any[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useMountAnimation(gridRef, {
    from: { y: 30, opacity: 0.9 },
    to: { y: 0, opacity: 1 },
    stagger: 120,
  });

  return (
    <div ref={gridRef} className="feature-card-grid">
      {cards.map((card, index) => (
        <div key={index} className="feature-card">
          {card.title}
        </div>
      ))}
    </div>
  );
}

/**
 * Example 8: Profile Info Rows with Stagger
 * 
 * Requirements: 7.3 - Profile info rows stagger (y:20, opacity:0 → y:0, opacity:1, 80ms)
 */
export function ProfileInfoRows({ rows }: { rows: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useMountAnimation(containerRef, {
    from: { y: 20, opacity: 0 },
    to: { y: 0, opacity: 1 },
    stagger: 80,
  });

  return (
    <div ref={containerRef} className="profile-info">
      {rows.map((row, index) => (
        <div key={index} className="info-row">
          <span className="label">{row.label}:</span>
          <span className="value">{row.value}</span>
        </div>
      ))}
    </div>
  );
}
