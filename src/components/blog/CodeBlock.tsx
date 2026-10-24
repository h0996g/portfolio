"use client";

import { useState } from "react";

export default function CodeBlock({
  children,
  filename,
  lang,
}: {
  children: string;
  filename?: string;
  lang?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className="my-7 rounded-lg overflow-hidden bg-gray-900 border border-gray-800 text-left font-poppins"
      dir="ltr"
    >
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 text-xs text-gray-400">
        <span className="font-mono">{filename ?? lang}</span>
        <button
          onClick={copy}
          className="hover:text-gray-100 transition-colors cursor-pointer"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="px-4 py-4 overflow-x-auto text-[14px] leading-relaxed text-gray-100 font-mono">
        <code>{children}</code>
      </pre>
    </div>
  );
}
