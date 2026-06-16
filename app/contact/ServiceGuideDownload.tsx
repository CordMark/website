"use client";

import { useEffect, useId, useRef, useState } from "react";
import { LoadingSubmitButton } from "../LoadingSubmitButton";

type DownloadStatus = "sent" | "error";

export function ServiceGuideDownload({ status }: { status?: DownloadStatus }) {
  const [isOpen, setIsOpen] = useState(status === "error");
  const titleId = useId();
  const descriptionId = useId();
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "error") {
      setIsOpen(true);
    }
  }, [status]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstInputRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="contact-next-step__actions">
      <button className="contact-download" type="button" onClick={() => setIsOpen(true)} aria-haspopup="dialog">
        サービス資料をダウンロードする <span aria-hidden="true">→</span>
      </button>

      {status === "sent" && (
        <p className="form-status form-status--success contact-download-status" role="status">
          ご入力いただいたメールアドレス宛に資料URLを送信しました。
        </p>
      )}

      {isOpen && (
        <div className="contact-modal" role="presentation">
          <button className="contact-modal__backdrop" type="button" aria-label="閉じる" onClick={() => setIsOpen(false)} />
          <div className="contact-modal__dialog" role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descriptionId}>
            <button className="contact-modal__close" type="button" aria-label="閉じる" onClick={() => setIsOpen(false)}>
              ×
            </button>

            <p className="contact-modal__kicker">Service Guide</p>
            <h2 id={titleId}>サービス資料をメールで受け取る</h2>
            <p id={descriptionId}>
              フォーム送信後、PDFのダウンロードURLをメールでお送りします。
            </p>

            {status === "error" && (
              <p className="form-status form-status--error contact-download-status" role="alert">
                送信できませんでした。入力内容をご確認のうえ、時間をおいて再度お試しください。
              </p>
            )}

            <form className="contact-download-form" action="/api/contact" method="post">
              <input type="hidden" name="formType" value="service-guide" />
              <input type="hidden" name="redirectTo" value="/contact#service-guide" />

              <div className="contact-field">
                <label htmlFor="download-company">
                  会社名 <span className="contact-required">必須</span>
                </label>
                <input id="download-company" ref={firstInputRef} name="company" type="text" placeholder="例）CordMark株式会社" required />
              </div>

              <div className="contact-field">
                <label htmlFor="download-name">
                  氏名 <span className="contact-required">必須</span>
                </label>
                <input id="download-name" name="name" type="text" placeholder="例）山田 太郎" required />
              </div>

              <div className="contact-field">
                <label htmlFor="download-role">役職</label>
                <input id="download-role" name="role" type="text" placeholder="例）事業責任者" />
              </div>

              <div className="contact-field">
                <label htmlFor="download-email">
                  メールアドレス <span className="contact-required">必須</span>
                </label>
                <input id="download-email" name="email" type="email" placeholder="例）taro.yamada@cordmark.co.jp" required />
              </div>

              <LoadingSubmitButton className="contact-submit contact-modal__submit">
                送信して資料URLを受け取る <span aria-hidden="true">→</span>
              </LoadingSubmitButton>

              <p className="contact-policy">
                ご入力いただいた情報は、
                <a href="/privacy-policy">プライバシーポリシー</a>
                に基づき適切に管理いたします。
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
