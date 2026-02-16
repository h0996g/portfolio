"use client";

import { Suspense, useState } from "react";
import Link from "next/link";

/* ── translations (same content) ─────────────────────────────── */

const t = {
  en: {
    header: "Merging Images with Isolate",
    sub: "Flutter Performance",
    lead: "Learn how to merge two images using Isolate in Flutter — keeping your UI buttery smooth while doing heavy image processing in the background.",
    introTitle: "The Problem",
    explanation: [
      "I had a real project where users needed to upload both sides of their ID card as a single merged image.",
      "I found a merge function online — but the merge itself wasn't the issue.",
      "The submit button showed a CircularProgressIndicator… but the moment the merge ran, the spinner froze. The whole app stuttered.",
      "Why? Because the merge function does all of this on the main thread:",
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
    resourcesTitle: "Resources",
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
  },
  ar: {
    header: "دمج الصور باستخدام Isolate",
    sub: "أداء Flutter",
    lead: "تعلّم كيف تدمج صورتين باستخدام Isolate في Flutter — مع الحفاظ على واجهة سلسة أثناء المعالجة الثقيلة في الخلفية.",
    introTitle: "المشكلة",
    explanation: [
      "صادفتني حالة في مشروع حقيقي حيث يُطلب من المستخدم رفع وجهي البطاقة الوطنية كصورة واحدة مدموجة.",
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
    resourcesTitle: "مصادر",
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

/* ── code block component ────────────────────────────────────── */

function Code({ children, label }: { children: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative group rounded-2xl overflow-hidden bg-[#0d1117] shadow-xl">
      {/* top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          {label && (
            <span className="ml-3 text-[11px] font-mono text-gray-500 uppercase tracking-wide">
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
          className="text-[11px] text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
      {/* code */}
      <pre className="p-5 overflow-auto max-h-96 text-[13px] leading-6 text-gray-300">
        <code>{children}</code>
      </pre>
    </div>
  );
}

/* ── main page ───────────────────────────────────────────────── */

function IsolateTutorialContent() {
  const [lang, setLang] = useState<Lang>("en");
  const c = t[lang];
  const rtl = lang === "ar";

  return (
    <div className="min-h-screen bg-[#fafafa]" dir={rtl ? "rtl" : "ltr"}>
      {/* language toggle */}
      <div className="fixed top-5 right-5 z-50">
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as Lang)}
          className="bg-white/80 backdrop-blur-md text-sm font-medium text-gray-600 border border-gray-200 rounded-full px-4 py-2 shadow-sm outline-none cursor-pointer hover:border-gray-300 transition-colors"
        >
          <option value="en">🌐 English</option>
          <option value="ar">🌐 العربية</option>
        </select>
      </div>

      {/* ── hero ── */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-violet-50 via-white to-[#fafafa]" />
        <div className="relative max-w-3xl mx-auto px-6 pt-24 pb-16 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-violet-500 mb-3">
            {c.sub}
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-none mb-6">
            {c.header}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
            {c.lead}
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-24 space-y-16">
        {/* ── the problem ── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {c.introTitle}
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            {c.explanation.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6">
            {c.mergeSteps.map((step, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 bg-white rounded-xl border border-gray-100 p-4 text-center shadow-xs"
              >
                <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-600 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-xs text-gray-600 leading-snug">
                  {step}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-start gap-3 bg-amber-50/80 border border-amber-200/60 rounded-xl p-4">
            <span className="text-amber-500 mt-0.5">⚠️</span>
            <p className="text-sm text-amber-800 leading-relaxed">
              {c.performanceNote}
            </p>
          </div>
        </section>

        {/* ── before vs after ── */}
        <section className="space-y-12">
          {/* BEFORE */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse" />
              <h2 className="text-2xl font-bold text-gray-900">
                {c.beforeTitle}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 items-start">
              <div className="flex flex-col items-center">
                <video
                  src="/video/slow.mp4"
                  controls
                  muted
                  className="rounded-2xl shadow-md w-full border border-gray-200"
                />
                <span className="mt-2 text-[11px] text-gray-400">
                  {c.beforeLabel}
                </span>
              </div>
              <Code label="dart">{legacyCode}</Code>
            </div>
          </div>

          {/* AFTER */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h2 className="text-2xl font-bold text-gray-900">
                {c.afterTitle}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 items-start">
              <div className="flex flex-col items-center">
                <video
                  src="/video/fast.mp4"
                  controls
                  muted
                  className="rounded-2xl shadow-md w-full border border-gray-200"
                />
                <span className="mt-2 text-[11px] text-gray-400">
                  {c.afterLabel}
                </span>
              </div>
              <Code label="dart">{isolateCode}</Code>
            </div>
          </div>
        </section>

        {/* ── the key change ── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-5">
            {c.explainTitle}
          </h2>
          <Code label="dart">{keySnippet}</Code>
          <ul className="mt-6 space-y-3">
            {c.computePoints.map((point, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed"
              >
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </section>

        {/* ── resources ── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-5">
            {c.resourcesTitle}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {c.resources.map((r, i) => (
              <a
                key={i}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-4 no-underline hover:border-violet-200 hover:shadow-sm transition-all group"
              >
                <span className="w-9 h-9 rounded-lg bg-violet-50 text-violet-500 flex items-center justify-center group-hover:bg-violet-100 transition-colors shrink-0">
                  <i className="fas fa-arrow-up-right-from-square text-xs" />
                </span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-violet-700 transition-colors">
                  {r.text}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* ── footer ── */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors no-underline shadow-md"
          >
            <i className={`fas fa-arrow-${rtl ? "right" : "left"} text-xs`} />
            {c.back}
          </Link>
        </div>
      </main>
    </div>
  );
}

export default function IsolateTutorialPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
          <div className="w-5 h-5 border-2 border-violet-300 border-t-violet-600 rounded-full animate-spin" />
        </div>
      }
    >
      <IsolateTutorialContent />
    </Suspense>
  );
}
