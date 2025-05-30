const translations = {
  ar: {
    pageTitle: "شرح دمج الصور باستخدام Isolate في Flutter",
    projectIntro: {
      header: "شرح دمج صورتين باستخدام Isolate في Flutter",
      lead: "في هذا الشرح، سنتناول كيفية دمج صورتين باستخدام Isolate في Flutter، وكيف تساهم هذه التقنية في تحسين الأداء ومنع تجميد الواجهة."
    },
    explanation: [
      "صادفتني حالة في مشروع كنت أعمل عليه حيث يُطلب من المستخدم إدخال صورة البطاقة الوطنية بوجهيها (الأمامي والخلفي)، وكان من الضروري دمج الصورتين في صورة واحدة قبل رفعها إلى الخادم.",
      "وجدت دالة جاهزة لدمج الصور أثناء البحث، لكن المشكلة لم تكن في طريقة الدمج نفسها.",
      "في الكود، يتم عرض زر إرسال يحتوي على حالة تحميل عند بدء المعالجة، حيث يظهر CircularProgressIndicator.",
      "لكن بمجرد استدعاء دالة دمج الصور، ظهر أن مؤشر التحميل يتوقف مؤقتًا أو يبطئ بشكل واضح — وكأن التطبيق بأكمله يتجمد مؤقتًا.",
      "السبب في ذلك أن دالة الدمج تتضمن:"
    ],
    mergeSteps: [
      "قراءة ملفات الصور من التخزين",
      "فك ترميز الصور (decode)",
      "إنشاء canvas جديد",
      "دمج الصور بالبكسلات",
      "إعادة حفظ الصورة"
    ],
    performanceNote: "كل ذلك يتم على الخيط الرئيسي (Main Thread)، وهو ما يؤدي إلى تعطيل قدرة Flutter على إعادة رسم الواجهة أثناء تنفيذ هذه العمليات.",
    legacyCodeTitle: "🔴 الكود القديم (بدون Isolate)",
    newCodeTitle: "✅ الكود الجديد (باستخدام Isolate)",
    codeExplanationTitle: "🔍 شرح التعديل",
    codeExplanation: `final mergedPath = await compute(
  _mergeImagesInIsolate,
  MergeImagesArgs(frontImage.path, backImage.path, outputPath),
);`,
    computePoints: [
      "`compute` تقوم بإنشاء isolate (خيط موازٍ) تلقائيًا.",
      "يتم تنفيذ الدالة _mergeImagesInIsolate داخل هذا isolate.",
      "يتم تمرير كائن MergeImagesArgs، والذي يحتوي على:",
      "- مسار الصورة الأمامية",
      "- مسار الصورة الخلفية",
      "- مسار حفظ الصورة المدموجة",
      "بعد انتهاء المعالجة، يتم إرجاع المسار الكامل للصورة النهائية وتخزينه في المتغير mergedPath."
    ],
    whyCompute: "لماذا استخدمنا compute؟",
    resourceLinks: [
      { text: "📘 دليل Dart الرسمي – Isolates", href: "https://dart.dev/language/isolates" },
      { text: "🧩 توثيق مكتبة compute – pub.dev", href: "https://pub.dev/documentation/compute/latest/" },
      { text: "🔍 وثائق Flutter API – دالة compute", href: "https://api.flutter.dev/flutter/foundation/compute.html" },
      { text: "📺 تحسين الأداء في Flutter باستخدام Isolates – Flutter Explained", href: "https://www.youtube.com/watch?v=PPwJ75vqP_s" },
      { text: "📺 استخدام Isolate في Flutter (حالة حقيقية) – Tadas Petra", href: "https://www.youtube.com/watch?v=5AxWC49ZMzs" }
    ],
    footerButton: "العودة إلى المعرض"
  },
  en: {
    pageTitle: "Merging Images Using Isolate in Flutter",
    projectIntro: {
      header: "How to Merge Two Images Using Isolate in Flutter",
      lead: "In this tutorial, we will explore how to merge two images using Isolate in Flutter, and how this technique helps enhance performance and avoid UI freeze."
    },
    explanation: [
      "I encountered a use case where the user needed to submit both front and back images of their ID card, and it was necessary to merge the images before uploading them to the server.",
      "I found a function for merging images online, but the problem wasn't with how merging works.",
      "In the code, a submit button shows a loading state using a CircularProgressIndicator.",
      "But once the image merging function is called, the loading spinner stutters—or the app freezes temporarily.",
      "This is because the merge function involves:"
    ],
    mergeSteps: [
      "Reading image files from storage",
      "Decoding the images",
      "Creating a new canvas",
      "Merging the images pixel by pixel",
      "Saving the final image"
    ],
    performanceNote: "All of this happens on the main thread (UI thread), which prevents Flutter from redrawing the UI during those operations.",
    legacyCodeTitle: "🔴 Legacy Code (No Isolate)",
    newCodeTitle: "✅ New Code (Using Isolate)",
    codeExplanationTitle: "🔍 Explanation of the Change",
    codeExplanation: `final mergedPath = await compute(
  _mergeImagesInIsolate,
  MergeImagesArgs(frontImage.path, backImage.path, outputPath),
);`,
    computePoints: [
      "`compute` automatically spawns a new isolate (parallel thread).",
      "The `_mergeImagesInIsolate` function runs inside this isolate.",
      "It receives a `MergeImagesArgs` object containing:",
      "- front image path",
      "- back image path",
      "- output path for the merged image",
      "After processing, it returns the final merged image path stored in `mergedPath`."
    ],
    whyCompute: "Why did we use `compute`?",
    resourceLinks: [
      { text: "📘 Dart Official Guide – Isolates", href: "https://dart.dev/language/isolates" },
      { text: "🧩 compute Library Documentation – pub.dev", href: "https://pub.dev/documentation/compute/latest/" },
      { text: "🔍 Flutter API Docs – compute function", href: "https://api.flutter.dev/flutter/foundation/compute.html" },
      { text: "📺 Improve Flutter Performance with Isolates – Flutter Explained", href: "https://www.youtube.com/watch?v=PPwJ75vqP_s" },
      { text: "📺 Using Isolate in Flutter (Real Use Case) – Tadas Petra", href: "https://www.youtube.com/watch?v=5AxWC49ZMzs" }
    ],
    footerButton: "Back to Portfolio"
  }
};

function applyTranslations(lang) {
  const t = translations[lang];

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  document.getElementById("page-title").textContent = t.pageTitle;
  document.getElementById("header-title").textContent = t.projectIntro.header;
  document.getElementById("header-lead").textContent = t.projectIntro.lead;

  const introDiv = document.getElementById("intro-paragraphs");
  introDiv.innerHTML = "";
  t.explanation.forEach(text => {
    const p = document.createElement("p");
    p.textContent = text;
    introDiv.appendChild(p);
  });

  const ul = document.createElement("ul");
  t.mergeSteps.forEach(step => {
    const li = document.createElement("li");
    li.textContent = step;
    ul.appendChild(li);
  });
  introDiv.appendChild(ul);

  document.getElementById("performance-note").textContent = t.performanceNote;
  document.getElementById("legacy-code-title").textContent = t.legacyCodeTitle;
  document.getElementById("new-code-title").textContent = t.newCodeTitle;
  document.getElementById("code-explanation-title").textContent = t.codeExplanationTitle;
  document.getElementById("code-snippet").textContent = t.codeExplanation;

  const computeList = document.getElementById("compute-points-list");
  computeList.innerHTML = "";
  t.computePoints.forEach(point => {
    const li = document.createElement("li");
    li.textContent = point;
    computeList.appendChild(li);
  });

  document.getElementById("why-compute-title").textContent = t.whyCompute;

  const resourceList = document.getElementById("resource-links");
  resourceList.innerHTML = "";
  t.resourceLinks.forEach(link => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = link.href;
    a.target = "_blank";
    a.textContent = link.text;
    li.appendChild(a);
    resourceList.appendChild(li);
  });

  document.getElementById("footer-button").textContent = t.footerButton;
}

// Default language
let currentLang = "en";
applyTranslations(currentLang);

// If switcher exists
document.addEventListener("DOMContentLoaded", () => {
  const switcher = document.getElementById("languageSwitcher");
  if (switcher) {
    switcher.value = currentLang;
    switcher.addEventListener("change", (e) => {
      currentLang = e.target.value;
      applyTranslations(currentLang);
    });
  }
});
