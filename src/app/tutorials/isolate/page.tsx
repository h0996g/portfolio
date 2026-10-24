"use client";

import { Suspense, useState } from "react";
import ArticleLayout, { ArticleLoading } from "@/components/blog/ArticleLayout";
import CodeBlock from "@/components/blog/CodeBlock";
import { A, Figure, H2, InlineCode, Note, Ol, P, Ul } from "@/components/blog/prose";

/* ── translations ─────────────────────────────────────────────── */

const t = {
  en: {
    header: "Merging Images with Isolate",
    sub: "Flutter · Isolates",
    lead: "How I fixed a frozen loading spinner by moving heavy image processing off the main thread.",
    introTitle: "The problem",
    explanation: [
      "On a real project, users had to upload both sides of their ID card as one merged image.",
      "I found a merge function online, and the merging itself worked fine. That wasn't the problem.",
      "The submit button showed a `CircularProgressIndicator` while the image was being prepared. But the moment the merge started, the spinner froze and the whole app stuttered.",
      "The reason is that the merge function does all of this on the main thread:",
    ],
    mergeSteps: [
      "Read the image files from storage",
      "Decode the images",
      "Create a new canvas",
      "Merge the pixels one by one",
      "Save the result",
    ],
    performanceNote:
      "While all of that runs on the main thread, Flutter can't redraw the UI, so even a spinner can't move.",
    compareIntro: "Here's what it looked like before and after the fix:",
    beforeLabel: "Before: the UI freezes",
    afterLabel: "After: the UI stays smooth",
    beforeTitle: "The original code",
    beforeText:
      "This is the function I started with. Everything here, from reading the files to encoding the JPG, runs on the main thread:",
    afterTitle: "Moving it to an isolate",
    afterText:
      "The fix is to move the heavy work into a separate isolate. I split the function in two: one part that runs inside the isolate, and a small wrapper that starts it with `compute`:",
    explainTitle: "The key change",
    explainText: [
      "The important part is the call to `compute`. It spawns a new isolate for you and runs `_mergeImagesInIsolate` there, off the main thread. The function gets a `MergeImagesArgs` object with the front image path, the back image path and the output path, and returns the path of the merged image.",
      "Meanwhile, the main thread is free to keep drawing the UI, so the spinner keeps spinning. If your app freezes during heavy work like this, `compute` is usually the easiest fix.",
    ],
    resourcesTitle: "Further reading",
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
    labels: {},
    readTime: "5 min read",
  },
  ar: {
    header: "دمج الصور باستخدام Isolate",
    sub: "Flutter · الأداء",
    lead: "كيف أصلحت تجمّد مؤشر التحميل بنقل معالجة الصور الثقيلة خارج الخيط الرئيسي.",
    introTitle: "المشكلة",
    explanation: [
      "في مشروع حقيقي، كان على المستخدم رفع وجهي البطاقة الوطنية كصورة واحدة مدموجة.",
      "وجدت دالة جاهزة للدمج على الإنترنت، والدمج نفسه كان يعمل بشكل جيد. لم تكن المشكلة هناك.",
      "كان زر الإرسال يعرض `CircularProgressIndicator` أثناء تجهيز الصورة. لكن بمجرد بدء الدمج، يتجمد المؤشر ويتوقف التطبيق كله للحظات.",
      "السبب أن دالة الدمج تنفّذ كل هذا على الخيط الرئيسي:",
    ],
    mergeSteps: [
      "قراءة ملفات الصور من التخزين",
      "فك ترميز الصور",
      "إنشاء canvas جديد",
      "دمج البكسلات واحدة واحدة",
      "حفظ النتيجة",
    ],
    performanceNote:
      "وطالما أن كل هذا يعمل على الخيط الرئيسي، لا يستطيع Flutter إعادة رسم الواجهة، فحتى مؤشر التحميل يتوقف عن الحركة.",
    compareIntro: "هكذا كان يبدو التطبيق قبل الإصلاح وبعده:",
    beforeLabel: "قبل: الواجهة تتجمد",
    afterLabel: "بعد: الواجهة تبقى سلسة",
    beforeTitle: "الكود الأصلي",
    beforeText:
      "هذه هي الدالة التي بدأت بها. كل شيء هنا، من قراءة الملفات إلى ترميز صورة JPG، يعمل على الخيط الرئيسي:",
    afterTitle: "نقل العمل إلى Isolate",
    afterText:
      "الحل هو نقل العمل الثقيل إلى isolate منفصل. قسمت الدالة إلى جزأين: جزء يعمل داخل الـ isolate، ودالة صغيرة تشغّله باستخدام `compute`:",
    explainTitle: "التغيير الجوهري",
    explainText: [
      "الجزء المهم هو استدعاء `compute`. فهي تنشئ isolate جديداً تلقائياً وتشغّل `_mergeImagesInIsolate` داخله، بعيداً عن الخيط الرئيسي. تستقبل الدالة كائن `MergeImagesArgs` يحتوي على مسار الصورة الأمامية ومسار الصورة الخلفية ومسار الحفظ، وتُرجع مسار الصورة المدموجة.",
      "وفي هذه الأثناء يبقى الخيط الرئيسي حراً لرسم الواجهة، فيستمر مؤشر التحميل في الدوران. إذا كان تطبيقك يتجمد أثناء عمل ثقيل كهذا، فإن `compute` غالباً هي أسهل حل.",
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
    labels: {
      back: "العودة إلى المعرض",
      writtenBy: "بقلم",
      role: "مطوّر Full Stack",
      more: "دروس أخرى",
    },
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

// Renders `backticked` parts of a translation string as inline code.
function withCode(text: string) {
  return text
    .split("`")
    .map((part, i) => (i % 2 ? <InlineCode key={i}>{part}</InlineCode> : part));
}

/* ── main page ───────────────────────────────────────────────── */

function IsolateTutorialContent() {
  const [lang, setLang] = useState<Lang>("en");
  const c = t[lang];
  const rtl = lang === "ar";

  const langToggle = (
    <div
      dir="ltr"
      className="flex text-xs font-medium rounded-md border border-gray-200 dark:border-gray-800 overflow-hidden"
    >
      {(["en", "ar"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2.5 py-1 cursor-pointer transition-colors ${
            lang === l
              ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );

  return (
    <ArticleLayout
      tag={c.sub}
      title={c.header}
      lede={c.lead}
      readTime={c.readTime}
      currentHref="/tutorials/isolate"
      dir={rtl ? "rtl" : "ltr"}
      actions={langToggle}
      labels={c.labels}
    >
      <H2>{c.introTitle}</H2>
      {c.explanation.map((p, i) => (
        <P key={i}>{withCode(p)}</P>
      ))}
      <Ol>
        {c.mergeSteps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </Ol>
      <Note>{c.performanceNote}</Note>

      <P>{c.compareIntro}</P>
      <Figure>
        <div className="grid grid-cols-2 gap-4 max-w-[460px] mx-auto">
          {[
            { src: "/video/slow.mp4", label: c.beforeLabel },
            { src: "/video/fast.mp4", label: c.afterLabel },
          ].map((v) => (
            <div key={v.src}>
              <video
                src={v.src}
                controls
                muted
                playsInline
                className="w-full rounded-lg bg-black border border-gray-200 dark:border-gray-800"
              />
              <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-500">
                {v.label}
              </p>
            </div>
          ))}
        </div>
      </Figure>

      <H2>{c.beforeTitle}</H2>
      <P>{c.beforeText}</P>
      <CodeBlock lang="dart">{legacyCode}</CodeBlock>

      <H2>{c.afterTitle}</H2>
      <P>{withCode(c.afterText)}</P>
      <CodeBlock lang="dart">{isolateCode}</CodeBlock>

      <H2>{c.explainTitle}</H2>
      <CodeBlock lang="dart">{keySnippet}</CodeBlock>
      {c.explainText.map((p, i) => (
        <P key={i}>{withCode(p)}</P>
      ))}

      <H2>{c.resourcesTitle}</H2>
      <Ul>
        {c.resources.map((r) => (
          <li key={r.href}>
            <A href={r.href}>
              <bdi>{r.text}</bdi>
            </A>
          </li>
        ))}
      </Ul>
    </ArticleLayout>
  );
}

export default function IsolateTutorialPage() {
  return (
    <Suspense fallback={<ArticleLoading />}>
      <IsolateTutorialContent />
    </Suspense>
  );
}
