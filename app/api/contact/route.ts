import { NextResponse } from "next/server";
import nodemailer, { type Transporter } from "nodemailer";

export const runtime = "nodejs";

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "info@cordmark.co.jp";
const DEFAULT_FROM = process.env.SMTP_FROM ?? "CordMark Website <info@cordmark.co.jp>";
const SERVICE_GUIDE_FROM = process.env.SERVICE_GUIDE_FROM ?? "CordMark <info@cordmark.co.jp>";
const SERVICE_GUIDE_PATH = "/docs/cordmark-service-guide.pdf";

const formTypes = {
  general: {
    label: "お問い合わせ",
    required: ["company", "name", "email"],
    fields: [
      "company",
      "name",
      "role",
      "email",
      "company-size",
      "department",
      "ai-status",
      "message",
      "budget",
      "meeting-date",
      "interest-area",
    ],
  },
  "ai-driven-development": {
    label: "AI駆動開発",
    required: ["company", "name", "email", "team-size"],
    fields: ["company", "name", "role", "email", "team-size", "tools", "issue"],
  },
  "ai-native-company": {
    label: "AI Native化",
    required: ["company", "name", "email"],
    fields: [
      "company",
      "name",
      "role",
      "email",
      "company-size",
      "department",
      "ai-status",
      "consultation",
      "budget",
      "date",
    ],
  },
  "service-guide": {
    label: "サービス資料請求",
    required: ["company", "name", "email"],
    fields: ["company", "name", "role", "email"],
  },
} as const;

const fieldLabels: Record<string, string> = {
  company: "会社名",
  name: "氏名",
  role: "役職",
  email: "メールアドレス",
  "company-size": "従業員規模",
  department: "対象にしたい部門",
  "ai-status": "現在のAI活用状況",
  message: "相談したい内容",
  budget: "予算感",
  "meeting-date": "希望面談日時",
  "interest-area": "相談したい領域",
  "team-size": "開発組織の人数",
  tools: "現在使っているAIツール",
  issue: "困っている開発工程",
  consultation: "相談したい内容",
  date: "希望面談日時",
};

type FormType = keyof typeof formTypes;

type SubmissionField = {
  name: string;
  label: string;
  value: string;
};

type ContactSubmission = {
  formType: FormType;
  label: string;
  fields: SubmissionField[];
  values: Record<string, string>;
  submittedAt: string;
};

type SubmissionStatus = "sent" | "error";

const statusParams: Record<FormType, Record<SubmissionStatus, string>> = {
  general: {
    sent: "sent",
    error: "error",
  },
  "ai-driven-development": {
    sent: "sent",
    error: "error",
  },
  "ai-native-company": {
    sent: "sent",
    error: "error",
  },
  "service-guide": {
    sent: "downloadSent",
    error: "downloadError",
  },
};

let transporter: Transporter | null = null;

function isFormType(value: string): value is FormType {
  return Object.prototype.hasOwnProperty.call(formTypes, value);
}

function getFormType(formData: FormData): FormType {
  const rawType = getText(formData, "formType");
  return isFormType(rawType) ? rawType : "general";
}

function getTransporter() {
  if (transporter) {
    return transporter;
  }

  const host = process.env.SMTP_HOST;
  if (!host) {
    throw new Error("SMTP_HOST is not configured.");
  }

  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: user && pass ? { user, pass } : undefined,
  });

  return transporter;
}

function getText(formData: FormData, name: string) {
  return formData
    .getAll(name)
    .filter((value): value is string => typeof value === "string")
    .map((value) => value.trim())
    .filter(Boolean)
    .join(", ");
}

function getRedirectUrl(request: Request, formData: FormData, status: SubmissionStatus, formType = getFormType(formData)) {
  const requestUrl = new URL(request.url);
  const redirectTo = getText(formData, "redirectTo") || request.headers.get("referer") || "/contact";
  let url = new URL(redirectTo, requestUrl);

  if (url.origin !== requestUrl.origin) {
    url = new URL("/contact", requestUrl);
  }

  const params = statusParams[formType];
  const successParam = params.sent;
  const errorParam = params.error;

  if (status === "sent") {
    url.searchParams.set(successParam, "1");
    url.searchParams.delete(errorParam);
  } else {
    url.searchParams.set(errorParam, "1");
    url.searchParams.delete(successParam);
  }

  return url;
}

function getSiteUrl(request: Request) {
  const configuredUrl = process.env.SITE_URL;
  if (configuredUrl) {
    return configuredUrl.endsWith("/") ? configuredUrl : `${configuredUrl}/`;
  }

  const requestUrl = new URL(request.url);
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const host = forwardedHost ?? requestUrl.host;
  const protocol = forwardedProto ?? requestUrl.protocol.replace(":", "");

  return `${protocol}://${host}/`;
}

function getSubmittedAt() {
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());
}

function extractSubmission(formData: FormData): ContactSubmission {
  const formType = getFormType(formData);
  const config = formTypes[formType];
  const values: Record<string, string> = {};
  const fields = config.fields.map((name) => {
    const value = getText(formData, name);
    values[name] = value;

    return {
      name,
      label: fieldLabels[name] ?? name,
      value,
    };
  });

  const missingFields = config.required.filter((name) => !values[name]);
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    throw new Error("Invalid email address.");
  }

  return {
    formType,
    label: config.label,
    fields,
    values,
    submittedAt: getSubmittedAt(),
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function subjectPart(value: string, fallback: string) {
  const normalized = value.replace(/[\r\n]+/g, " ").trim();
  return (normalized || fallback).slice(0, 80);
}

function buildAdminSubject(submission: ContactSubmission) {
  const company = subjectPart(submission.values.company, "会社名未入力");
  const name = subjectPart(submission.values.name, "氏名未入力");
  return `【CordMark】${submission.label}フォーム: ${company} / ${name}`;
}

function buildTextBody(submission: ContactSubmission, intro: string) {
  const lines = [
    intro,
    "",
    `フォーム種別: ${submission.label}`,
    `送信日時: ${submission.submittedAt}`,
    "",
    ...submission.fields.map((field) => `${field.label}: ${field.value || "未入力"}`),
  ];

  return lines.join("\n");
}

function buildHtmlBody(submission: ContactSubmission, heading: string, intro: string) {
  const rows = submission.fields
    .map(
      (field) => `
        <tr>
          <th style="width: 180px; padding: 10px 12px; border: 1px solid #dce3ec; background: #f5f8fb; text-align: left; vertical-align: top;">${escapeHtml(
            field.label,
          )}</th>
          <td style="padding: 10px 12px; border: 1px solid #dce3ec; white-space: pre-wrap;">${escapeHtml(
            field.value || "未入力",
          )}</td>
        </tr>
      `,
    )
    .join("");

  return `
    <div style="font-family: Arial, 'Hiragino Kaku Gothic ProN', 'Yu Gothic', Meiryo, sans-serif; color: #111; line-height: 1.7;">
      <h1 style="font-size: 20px; margin: 0 0 12px;">${escapeHtml(heading)}</h1>
      <p style="margin: 0 0 18px; white-space: pre-wrap;">${escapeHtml(intro)}</p>
      <p style="margin: 0 0 18px;">フォーム種別: ${escapeHtml(submission.label)}<br />送信日時: ${escapeHtml(
        submission.submittedAt,
      )}</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 760px; font-size: 14px;">
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function buildServiceGuideHtmlBody(submission: ContactSubmission, guideUrl: string) {
  const name = submission.values.name || "ご担当者";
  const escapedUrl = escapeHtml(guideUrl);

  return `
    <div style="font-family: Arial, 'Hiragino Kaku Gothic ProN', 'Yu Gothic', Meiryo, sans-serif; color: #111; line-height: 1.8;">
      <h1 style="font-size: 20px; margin: 0 0 12px;">サービス資料ダウンロードURLのご案内</h1>
      <p style="margin: 0 0 18px; white-space: pre-wrap;">${escapeHtml(
        `${name} 様\n\nCordMarkのサービス資料をご請求いただきありがとうございます。以下のURLよりPDFをご確認ください。`,
      )}</p>
      <p style="margin: 0 0 18px;">
        <a href="${escapedUrl}" style="display: inline-block; padding: 12px 18px; border-radius: 4px; color: #fff; background: #1557ce; text-decoration: none; font-weight: bold;">サービス資料PDFを開く</a>
      </p>
      <p style="margin: 0 0 18px; word-break: break-all;">
        URL: <a href="${escapedUrl}" style="color: #1557ce;">${escapedUrl}</a>
      </p>
      <p style="margin: 0;">本メールにはPDFを添付しておりません。</p>
      <p style="margin: 18px 0 0; color: #555; font-size: 13px;">送信日時: ${escapeHtml(submission.submittedAt)}</p>
    </div>
  `;
}

async function sendAdminNotification(submission: ContactSubmission) {
  const mailer = getTransporter();
  const email = submission.values.email;

  await mailer.sendMail({
    from: DEFAULT_FROM,
    to: CONTACT_TO_EMAIL,
    replyTo: email,
    subject: buildAdminSubject(submission),
    text: buildTextBody(submission, "Webサイトからお問い合わせがありました。"),
    html: buildHtmlBody(submission, "Webサイトからお問い合わせがありました", "以下の内容でフォームが送信されました。"),
  });
}

async function sendServiceGuideReply(submission: ContactSubmission, request: Request) {
  const mailer = getTransporter();
  const name = submission.values.name || "ご担当者";
  const guideUrl = new URL(SERVICE_GUIDE_PATH, getSiteUrl(request)).toString();
  const subject = "【CordMark】サービス資料ダウンロードURLのご案内";
  const text = `${name} 様

CordMarkのサービス資料をご請求いただきありがとうございます。
以下のURLよりPDFをご確認ください。

${guideUrl}

本メールにはPDFを添付しておりません。

送信日時: ${submission.submittedAt}`;

  await mailer.sendMail({
    from: SERVICE_GUIDE_FROM,
    to: submission.values.email,
    replyTo: CONTACT_TO_EMAIL,
    subject,
    text,
    html: buildServiceGuideHtmlBody(submission, guideUrl),
  });
}

async function sendAutoReply(submission: ContactSubmission, request: Request) {
  if (submission.formType === "service-guide") {
    await sendServiceGuideReply(submission, request);
    return;
  }

  const mailer = getTransporter();
  const name = submission.values.name || "ご担当者";
  const subject = `【CordMark】お問い合わせありがとうございます（${submission.label}）`;
  const intro = `${name} 様\n\nCordMarkへお問い合わせいただきありがとうございます。以下の内容でお問い合わせを受け付けました。担当者より2営業日以内を目安にご連絡いたします。`;

  await mailer.sendMail({
    from: DEFAULT_FROM,
    to: submission.values.email,
    replyTo: CONTACT_TO_EMAIL,
    subject,
    text: buildTextBody(submission, intro),
    html: buildHtmlBody(
      submission,
      "お問い合わせありがとうございます",
      `${name} 様\n\nCordMarkへお問い合わせいただきありがとうございます。以下の内容でお問い合わせを受け付けました。担当者より2営業日以内を目安にご連絡いたします。`,
    ),
  });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const formType = getFormType(formData);

  try {
    const submission = extractSubmission(formData);
    await sendAdminNotification(submission);
    await sendAutoReply(submission, request);

    return NextResponse.redirect(getRedirectUrl(request, formData, "sent", formType), { status: 303 });
  } catch (error) {
    console.error("Failed to submit contact form:", error);
    return NextResponse.redirect(getRedirectUrl(request, formData, "error", formType), { status: 303 });
  }
}
