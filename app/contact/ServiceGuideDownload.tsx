"use client";

import { useEffect, useState } from "react";
import { LoadingSubmitButton } from "../LoadingSubmitButton";

type DownloadStatus = "sent" | "error";

function readDownloadStatus(): DownloadStatus | undefined {
  const params = new URLSearchParams(window.location.search);

  if (params.get("downloadError") === "1") {
    return "error";
  }

  if (params.get("downloadSent") === "1") {
    return "sent";
  }

  return undefined;
}

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2.5 8h10" />
      <path d="m8.5 4 4 4-4 4" />
    </svg>
  );
}

export function ServiceGuideDownload() {
  const [status, setStatus] = useState<DownloadStatus>();

  useEffect(() => {
    setStatus(readDownloadStatus());
  }, []);

  return (
    <form className="wv-form wv-form--paper wv-ct-guide__form" action="/api/contact" method="post" data-reveal="2">
      <input type="hidden" name="formType" value="service-guide" />
      <input type="hidden" name="redirectTo" value="/contact#service-guide" />

      {status === "sent" && (
        <p className="form-status form-status--success" role="status">
          ご入力いただいたメールアドレス宛に資料URLを送信しました。
        </p>
      )}

      {status === "error" && (
        <p className="form-status form-status--error" role="alert">
          送信できませんでした。入力内容をご確認のうえ、時間をおいて再度お試しください。
        </p>
      )}

      <div className="wv-field">
        <label htmlFor="download-company">
          会社名 <span className="wv-req">必須</span>
        </label>
        <input id="download-company" name="company" type="text" placeholder="例）CordMark株式会社" required />
      </div>

      <div className="wv-field">
        <label htmlFor="download-name">
          氏名 <span className="wv-req">必須</span>
        </label>
        <input id="download-name" name="name" type="text" placeholder="例）山田 太郎" required />
      </div>

      <div className="wv-field">
        <label htmlFor="download-role">役職</label>
        <input id="download-role" name="role" type="text" placeholder="例）事業責任者" />
      </div>

      <div className="wv-field">
        <label htmlFor="download-email">
          メールアドレス <span className="wv-req">必須</span>
        </label>
        <input id="download-email" name="email" type="email" placeholder="例）taro.yamada@cordmark.co.jp" required />
      </div>

      <p className="wv-note">
        ご入力いただいた情報は、<a href="/privacy-policy">プライバシーポリシー</a>
        に基づき適切に管理いたします。
      </p>

      <LoadingSubmitButton className="wv-submit">
        資料を受け取る <Arrow />
      </LoadingSubmitButton>
    </form>
  );
}
