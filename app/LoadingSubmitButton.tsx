"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type LoadingSubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  loadingLabel?: string;
};

export function LoadingSubmitButton({
  children,
  className = "",
  disabled,
  loadingLabel = "送信中...",
  onClick,
  type = "submit",
  ...props
}: LoadingSubmitButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showLoadingEffect = useCallback(() => {
    const button = buttonRef.current;

    if (!button) {
      return;
    }

    button.classList.add("is-loading");
    button.setAttribute("aria-busy", "true");
  }, []);

  const setLoadingState = useCallback(
    (loading: boolean) => {
      const button = buttonRef.current;

      if (button) {
        button.disabled = disabled || loading;
        button.classList.toggle("is-loading", loading);

        if (loading) {
          button.setAttribute("aria-busy", "true");
        } else {
          button.removeAttribute("aria-busy");
        }
      }

      setIsSubmitting(loading);
    },
    [disabled],
  );

  useEffect(() => {
    const button = buttonRef.current;
    const form = button?.form;

    if (!button || !form) {
      return;
    }

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
  }, [setLoadingState]);

  const handleClick: NonNullable<ButtonHTMLAttributes<HTMLButtonElement>["onClick"]> = (event) => {
    onClick?.(event);

    if (event.defaultPrevented || type !== "submit") {
      return;
    }

    const form = buttonRef.current?.form;

    if (form?.checkValidity()) {
      showLoadingEffect();
    }
  };

  return (
    <button
      {...props}
      ref={buttonRef}
      className={`loading-submit${className ? ` ${className}` : ""}${isSubmitting ? " is-loading" : ""}`}
      disabled={disabled || isSubmitting}
      type={type}
      aria-busy={isSubmitting}
      onClick={handleClick}
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
