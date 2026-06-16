"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type LoadingSubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  loadingLabel?: string;
};

export function LoadingSubmitButton({
  children,
  className = "",
  disabled,
  loadingLabel = "送信中...",
  type = "submit",
  ...props
}: LoadingSubmitButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const button = buttonRef.current;
    const form = button?.form;

    if (!button || !form) {
      return;
    }

    const setLoadingState = (loading: boolean) => {
      button.disabled = disabled || loading;
      button.classList.toggle("is-loading", loading);

      if (loading) {
        button.setAttribute("aria-busy", "true");
      } else {
        button.removeAttribute("aria-busy");
      }

      setIsSubmitting(loading);
    };

    const handleSubmit = (event: Event) => {
      const submitEvent = event as SubmitEvent;

      if (submitEvent.defaultPrevented) {
        return;
      }

      if (submitEvent.submitter && submitEvent.submitter !== button) {
        return;
      }

      setLoadingState(true);
    };

    const handleReset = () => {
      setLoadingState(false);
    };

    form.addEventListener("submit", handleSubmit);
    form.addEventListener("reset", handleReset);
    window.addEventListener("pageshow", handleReset);

    return () => {
      form.removeEventListener("submit", handleSubmit);
      form.removeEventListener("reset", handleReset);
      window.removeEventListener("pageshow", handleReset);
    };
  }, [disabled]);

  return (
    <button
      {...props}
      ref={buttonRef}
      className={`loading-submit${className ? ` ${className}` : ""}${isSubmitting ? " is-loading" : ""}`}
      disabled={disabled || isSubmitting}
      type={type}
      aria-busy={isSubmitting}
    >
      <span className="submit-button__content" aria-hidden={isSubmitting}>
        {children}
      </span>
      <span className="submit-button__loading" aria-hidden={!isSubmitting}>
        <span className="submit-spinner" aria-hidden="true" />
        {loadingLabel}
      </span>
    </button>
  );
}
