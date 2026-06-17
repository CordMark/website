"use client";

import { useEffect, useState } from "react";

type QueryStatus = "sent" | "error";

type QueryFormStatusProps = {
  successMessage: string;
  errorMessage: string;
  className?: string;
  successParam?: string;
  errorParam?: string;
};

function readQueryStatus(successParam: string, errorParam: string): QueryStatus | undefined {
  const params = new URLSearchParams(window.location.search);

  if (params.get(errorParam) === "1") {
    return "error";
  }

  if (params.get(successParam) === "1") {
    return "sent";
  }

  return undefined;
}

export function QueryFormStatus({
  successMessage,
  errorMessage,
  className = "",
  successParam = "sent",
  errorParam = "error",
}: QueryFormStatusProps) {
  const [status, setStatus] = useState<QueryStatus>();

  useEffect(() => {
    setStatus(readQueryStatus(successParam, errorParam));
  }, [errorParam, successParam]);

  if (status === "sent") {
    return (
      <p className={`form-status form-status--success${className ? ` ${className}` : ""}`} role="status">
        {successMessage}
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className={`form-status form-status--error${className ? ` ${className}` : ""}`} role="alert">
        {errorMessage}
      </p>
    );
  }

  return null;
}
