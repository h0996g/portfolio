import Link from "next/link";

// Poppins for headings; RTL pages inherit the Arabic article font instead,
// since Poppins has no Arabic glyphs.
const headingFont = "font-poppins rtl:font-[family-name:inherit]";

export function H2({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className={`${headingFont} mt-14 mb-4 text-2xl font-semibold leading-snug text-gray-900 dark:text-gray-100 scroll-mt-8`}
    >
      {children}
    </h2>
  );
}

export function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className={`${headingFont} mt-10 mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100`}
    >
      {children}
    </h3>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-6">{children}</p>;
}

export function Ul({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mb-6 ps-6 list-disc space-y-2 marker:text-gray-400 dark:marker:text-gray-600">
      {children}
    </ul>
  );
}

export function Ol({ children }: { children: React.ReactNode }) {
  return (
    <ol className="mb-6 ps-6 list-decimal space-y-2 marker:text-gray-500 dark:marker:text-gray-500">
      {children}
    </ol>
  );
}

export function A({ href, children }: { href: string; children: React.ReactNode }) {
  const className =
    "text-gray-900 dark:text-gray-100 underline decoration-emerald-500/60 dark:decoration-emerald-400/60 underline-offset-4 hover:decoration-2 hover:decoration-emerald-600 dark:hover:decoration-emerald-400";
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-[0.85em] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200">
      {children}
    </code>
  );
}

export function Blockquote({
  children,
  cite,
}: {
  children: React.ReactNode;
  cite?: React.ReactNode;
}) {
  return (
    <figure className="my-8">
      <blockquote className="border-s-2 border-gray-300 dark:border-gray-700 ps-5 italic text-gray-700 dark:text-gray-400">
        {children}
      </blockquote>
      {cite && (
        <figcaption className="mt-3 ps-5 text-sm not-italic text-gray-500 dark:text-gray-500">
          — {cite}
        </figcaption>
      )}
    </figure>
  );
}

export function Note({
  children,
  label,
}: {
  children: React.ReactNode;
  label?: string;
}) {
  return (
    <aside className="my-8 border-s-2 border-emerald-500 bg-gray-50 dark:bg-gray-900 px-5 py-4 rounded-e-md text-[1rem] leading-7">
      {label && <strong className="font-semibold text-gray-900 dark:text-gray-100">{label} </strong>}
      {children}
    </aside>
  );
}

export function Figure({
  children,
  caption,
}: {
  children: React.ReactNode;
  caption?: React.ReactNode;
}) {
  return (
    <figure className="my-10">
      {children}
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-gray-500 dark:text-gray-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
