"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";

/* ── translations ─────────────────────────────────────────────── */

const t = {
  en: {
    header: "Merging Images with Isolate",
    sub: "Flutter · isolate",
    lead: "How I fixed a frozen loading spinner by moving heavy image processing off the main thread.",
    introTitle: "The Problem",
    explanation: [
      "In a real project, users needed to upload both sides of their ID card as a single merged image.",
      "I found a merge function online — but the merge itself wasn't the issue.",
      "The submit button showed a CircularProgressIndicator… but the moment the merge ran, the spinner froze. The whole app stuttered.",
      "Why? Because the merge function runs all of this on the main thread:",
    ],
    mergeSteps: [
      "Read image files from storage",
      "Decode the images",
      "Create a new canvas",
      "Merge pixels one by one",
      "Save the result",
    ],
    performanceNote:
      "All on the main thread — blocking Flutter from redrawing the UI.",
    beforeTitle: "Before — No Isolate",
    afterTitle: "After — With Isolate",
    beforeLabel: "UI freezes during merge",
    afterLabel: "Smooth UI while merging",
    explainTitle: "The Key Change",
    computePoints: [
      "`compute` spawns a new isolate (parallel thread) automatically.",
      "`_mergeImagesInIsolate` runs inside this isolate — off the main thread.",
      "It receives a `MergeImagesArgs` with front path, back path, and output path.",
      "Returns the merged image path. Main thread stays free to animate the UI.",
    ],
    resourcesTitle: "Further Reading",
    resources: [
      {
        text: "Dart Guide — Isolates",
        href: "https://dart.dev/language/isolates",
      },
      {
        text: "Flutter API — compute()",
        href: "https://api.flutter.dev/flutter/foundation/compute.html",
      },
      {
        text: "Flutter Performance with Isolates",
        href: "https://www.youtube.com/watch?v=PPwJ75vqP_s",
      },
      {
        text: "Real-World Isolate Usage",
        href: "https://www.youtube.com/watch?v=5AxWC49ZMzs",
      },
    ],
    back: "Back to Portfolio",
    readTime: "5 min read",
  },
  ar: {
    header: "دمج الصور باستخدام Isolate",
    sub: "Flutter · الأداء",
    lead: "كيف أصلحت تجمّد مؤشر التحميل بنقل معالجة الصور الثقيلة خارج الخيط الرئيسي.",
    introTitle: "المشكلة",
    explanation: [
      "في مشروع حقيقي، كان المستخدم يُطلب منه رفع وجهي البطاقة الوطنية كصورة واحدة مدموجة.",
      "وجدت دالة جاهزة للدمج — لكن المشكلة لم تكن في الدمج نفسه.",
      "زر الإرسال يعرض CircularProgressIndicator… لكن بمجرد بدء الدمج، يتجمد المؤشر. التطبيق كله يتوقف لحظياً.",
      "السبب؟ لأن دالة الدمج تنفّذ كل هذا على الخيط الرئيسي:",
    ],
    mergeSteps: [
      "قراءة ملفات الصور من التخزين",
      "فك ترميز الصور",
      "إنشاء canvas جديد",
      "دمج البكسلات واحدة واحدة",
      "حفظ النتيجة",
    ],
    performanceNote:
      "كل ذلك على الخيط الرئيسي — يمنع Flutter من إعادة رسم الواجهة.",
    beforeTitle: "قبل — بدون Isolate",
    afterTitle: "بعد — مع Isolate",
    beforeLabel: "تجمد الواجهة أثناء الدمج",
    afterLabel: "واجهة سلسة أثناء الدمج",
    explainTitle: "التغيير الجوهري",
    computePoints: [
      "`compute` تنشئ isolate (خيط موازٍ) تلقائياً.",
      "`_mergeImagesInIsolate` تعمل داخل هذا الـ isolate — بعيداً عن الخيط الرئيسي.",
      "تستقبل `MergeImagesArgs` مع مسار الصورة الأمامية والخلفية ومسار الحفظ.",
      "تُرجع مسار الصورة المدموجة. الخيط الرئيسي يبقى حراً لتحريك الواجهة.",
    ],
    resourcesTitle: "مصادر إضافية",
    resources: [
      {
        text: "دليل Dart الرسمي — Isolates",
        href: "https://dart.dev/language/isolates",
      },
      {
        text: "Flutter API — compute()",
        href: "https://api.flutter.dev/flutter/foundation/compute.html",
      },
      {
        text: "تحسين أداء Flutter مع Isolates",
        href: "https://www.youtube.com/watch?v=PPwJ75vqP_s",
      },
      {
        text: "استخدام Isolate عملياً",
        href: "https://www.youtube.com/watch?v=5AxWC49ZMzs",
      },
    ],
    back: "العودة إلى المعرض",
    readTime: "٥ دقائق قراءة",
  },
};

type Lang = "en" | "ar";

/* ── code snippets ───────────────────────────────────────────── */

const legacyCode = `Future<File> mergeImagesVertically(File front, File back) async {
  final img.Image image1 = img.decodeImage(await front.readAsBytes())!;
  final img.Image image2 = img.decodeImage(await back.readAsBytes())!;

  final int finalWidth = max(image1.width, image2.width);
  final int finalHeight = image1.height + image2.height;

  final img.Image canvas = img.copyExpandCanvas(
    image1,
    newWidth: finalWidth,
    newHeight: finalHeight,
    position: img.ExpandCanvasPosition.topLeft,
  );

  final img.Image finalImage = img.compositeImage(
    canvas, image2, dstX: 0, dstY: image1.height,
  );

  final dir = await getApplicationDocumentsDirectory();
  final path = join(dir.path, 'merged_\${DateTime.now().millisecondsSinceEpoch}.jpg');
  final file = File(path);
  await file.writeAsBytes(img.encodeJpg(finalImage));
  return file;
}`;

const isolateCode = `class MergeImagesArgs {
  final String frontPath;
  final String backPath;
  final String outputPath;
  MergeImagesArgs(this.frontPath, this.backPath, this.outputPath);
}

Future<String> _mergeImagesInIsolate(MergeImagesArgs args) async {
  final front = File(args.frontPath);
  final back = File(args.backPath);

  final img.Image image1 = img.decodeImage(await front.readAsBytes())!;
  final img.Image image2 = img.decodeImage(await back.readAsBytes())!;

  final int finalWidth = max(image1.width, image2.width);
  final int finalHeight = image1.height + image2.height;

  final img.Image canvas = img.copyExpandCanvas(
    image1,
    newWidth: finalWidth,
    newHeight: finalHeight,
    position: img.ExpandCanvasPosition.topLeft,
  );

  final img.Image finalImage = img.compositeImage(
    canvas, image2, dstX: 0, dstY: image1.height,
  );

  final file = File(args.outputPath);
  await file.writeAsBytes(img.encodeJpg(finalImage));
  return file.path;
}

Future<File> mergeImagesVerticallyInBackground(
  File frontImage, File backImage,
) async {
  final dir = await getApplicationDocumentsDirectory();
  final outputPath = join(
    dir.path, 'merged_\${DateTime.now().millisecondsSinceEpoch}.jpg',
  );

  final mergedPath = await compute(
    _mergeImagesInIsolate,
    MergeImagesArgs(frontImage.path, backImage.path, outputPath),
  );

  return File(mergedPath);
}`;

const keySnippet = `final mergedPath = await compute(
  _mergeImagesInIsolate,
  MergeImagesArgs(frontImage.path, backImage.path, outputPath),
);`;

/* ── code block ──────────────────────────────────────────────── */

function Code({ children, label }: { children: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div
      className="rounded-xl overflow-hidden bg-[#0d1117] border border-white/5 shadow-lg text-left"
      dir="ltr"
    >
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-white/5">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          {label && (
            <span className="ml-2 text-[10px] font-mono text-gray-500 uppercase tracking-wider">
              {label}
            </span>
          )}
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(children);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="text-[11px] text-gray-500 hover:text-gray-200 transition-colors cursor-pointer flex items-center gap-1"
        >
          {copied ? (
            <>
              <i className="fas fa-check" style={{ color: "#FF9644" }} />{" "}
              <span style={{ color: "#FF9644" }}>Copied</span>
            </>
          ) : (
            <>
              <i className="fas fa-copy" /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-5 overflow-x-auto max-h-105 text-[13px] leading-[1.7] text-gray-300 font-mono">
        <code>{children}</code>
      </pre>
    </div>
  );
}

/* ── main page ───────────────────────────────────────────────── */

function IsolateTutorialContent() {
  const [lang, setLang] = useState<Lang>("en");
  const { theme } = useTheme();
  const dark = theme === "dark";
  const c = t[lang];
  const rtl = lang === "ar";

  const palette = {
    bg:             dark ? "#141414" : "#FFFDF1",
    topbar:         dark ? "#141414" : "#FFFDF1",
    border:         dark ? "#2E2015" : "#FFCE99",
    heading:        dark ? "#FFE4C2" : "#562F00",
    body:           dark ? "#BFA080" : "#562F00",
    accent:         "#FF9644",
    stepBg:         dark ? "#261500" : "#FFCE99",
    stepBorder:     dark ? "#FF964450" : "#FF9644",
    calloutBg:      dark ? "#FF964412" : "#FFCE9940",
    toggleActive:   "#FF9644",
    toggleInactive: dark ? "#141414" : "transparent",
    toggleText:     dark ? "#BFA080" : "#562F00",
  };

  return (
    <div
      className="min-h-screen transition-colors"
      style={{ background: palette.bg, color: palette.body }}
      dir={rtl ? "rtl" : "ltr"}
    >
      {/* ── top bar ── */}
      <div
        className="sticky top-0 z-40 border-b"
        style={{ background: palette.topbar, borderColor: palette.border }}
      >
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium transition-colors no-underline"
            style={{ color: palette.accent }}
          >
            <i className={`fas fa-arrow-${rtl ? "right" : "left"} text-xs`} />
            {c.back}
          </Link>

          {/* lang toggle — always physical left-to-right */}
          <div style={{ direction: "ltr" }}>
            <div
              className="flex items-center rounded-lg overflow-hidden"
              style={{ border: `1px solid ${palette.border}` }}
            >
              {(["en", "ar"] as Lang[]).map((l, i) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className="px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer"
                  style={{
                    borderLeft: i !== 0 ? `1px solid ${palette.border}` : undefined,
                    background: lang === l ? palette.toggleActive : palette.toggleInactive,
                    color: lang === l ? "#FFFDF1" : palette.toggleText,
                  }}
                >
                  {l === "en" ? "EN" : "AR"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── article ── */}
      <article className="max-w-3xl mx-auto px-6 py-14">
        {/* header */}
        <header
          className="mb-12 pb-10"
          style={{ borderBottom: `1px solid ${palette.border}` }}
        >
          <p
            className="text-sm font-mono font-semibold mb-3"
            style={{ color: palette.accent }}
          >
            {c.sub}
          </p>
          <h1
            className="text-3xl md:text-4xl font-bold leading-snug mb-4"
            style={{ color: palette.heading }}
          >
            {c.header}
          </h1>
          <p
            className="text-lg leading-relaxed mb-5"
            style={{ color: palette.body, opacity: 0.8 }}
          >
            {c.lead}
          </p>
          <span
            className="text-xs font-mono"
            style={{ color: palette.accent, opacity: 0.8 }}
          >
            {c.readTime}
          </span>
        </header>

        {/* ── the problem ── */}
        <section className="mb-14">
          <h2 className="text-xl font-bold mb-5" style={{ color: palette.heading }}>
            {c.introTitle}
          </h2>
          <div
            className="space-y-3 leading-relaxed mb-8"
            style={{ color: palette.body, opacity: 0.85 }}
          >
            {c.explanation.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* numbered steps */}
          <ol className="space-y-2 mb-6">
            {c.mergeSteps.map((step, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-sm"
                style={{ color: palette.body }}
              >
                <span
                  className="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0"
                  style={{
                    background: palette.stepBg,
                    color: palette.heading,
                    border: `1px solid ${palette.stepBorder}`,
                  }}
                >
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>

          {/* callout */}
          <div
            className="flex gap-3 px-4 py-3 rounded-lg"
            style={{
              background: palette.calloutBg,
              borderLeft: rtl ? undefined : `4px solid ${palette.accent}`,
              borderRight: rtl ? `4px solid ${palette.accent}` : undefined,
              borderRadius: rtl ? "0.5rem 0 0 0.5rem" : "0 0.5rem 0.5rem 0",
            }}
          >
            <i
              className="fas fa-triangle-exclamation mt-0.5 shrink-0"
              style={{ color: palette.accent }}
            />
            <p className="text-sm leading-relaxed" style={{ color: palette.body }}>
              {c.performanceNote}
            </p>
          </div>
        </section>

        {/* ── before ── */}
        <section className="mb-14">
          <div className="flex items-center gap-2.5 mb-5">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            <h2 className="text-xl font-bold" style={{ color: palette.heading }}>
              {c.beforeTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-4 items-start">
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-xl overflow-hidden shadow-sm bg-black"
                style={{ border: `1px solid ${palette.border}` }}
              >
                <video
                  src="/video/slow.mp4"
                  controls
                  muted
                  className="w-full"
                />
              </div>
              <span
                className="text-[11px] text-center leading-tight"
                style={{ color: palette.body, opacity: 0.6 }}
              >
                {c.beforeLabel}
              </span>
            </div>
            <Code label="dart">{legacyCode}</Code>
          </div>
        </section>

        {/* ── after ── */}
        <section className="mb-14">
          <div className="flex items-center gap-2.5 mb-5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <h2 className="text-xl font-bold" style={{ color: palette.heading }}>
              {c.afterTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-4 items-start">
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-xl overflow-hidden shadow-sm bg-black"
                style={{ border: `1px solid ${palette.border}` }}
              >
                <video
                  src="/video/fast.mp4"
                  controls
                  muted
                  className="w-full"
                />
              </div>
              <span
                className="text-[11px] text-center leading-tight"
                style={{ color: palette.body, opacity: 0.6 }}
              >
                {c.afterLabel}
              </span>
            </div>
            <Code label="dart">{isolateCode}</Code>
          </div>
        </section>

        {/* ── key change ── */}
        <section className="mb-14">
          <h2 className="text-xl font-bold mb-5" style={{ color: palette.heading }}>
            {c.explainTitle}
          </h2>
          <Code label="dart">{keySnippet}</Code>
          <ul className="mt-6 space-y-3">
            {c.computePoints.map((point, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm leading-relaxed"
                style={{ color: palette.body }}
              >
                <span
                  className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: palette.accent }}
                />
                {point}
              </li>
            ))}
          </ul>
        </section>

        {/* ── resources ── */}
        <section>
          <h2 className="text-xl font-bold mb-5" style={{ color: palette.heading }}>
            {c.resourcesTitle}
          </h2>
          <ul className="space-y-2">
            {c.resources.map((r, i) => (
              <li key={i}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm font-medium hover:underline no-underline"
                  style={{ color: palette.accent }}
                >
                  <i className="fas fa-arrow-up-right-from-square text-[10px] opacity-70 group-hover:opacity-100 transition-opacity" />
                  {r.text}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
}

export default function IsolateTutorialPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FFFDF1] dark:bg-[#1A1008]">
          <div
            className="w-5 h-5 border-2 rounded-full animate-spin"
            style={{ borderColor: "#FFCE99", borderTopColor: "#FF9644" }}
          />
        </div>
      }
    >
      <IsolateTutorialContent />
    </Suspense>
  );
}
