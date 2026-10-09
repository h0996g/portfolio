"use client";

import { useEffect, useRef } from "react";

export interface ClosedTesting {
  groupUrl: string;
  video: string;
  poster?: string;
}

// Google Play's web opt-in page for a closed test, built from the store link's package id.
function optInUrl(playStore: string) {
  const id = new URL(playStore).searchParams.get("id");
  return id ? `https://play.google.com/apps/testing/${id}` : playStore;
}

export default function JoinTestDialog({
  title,
  playStore,
  closedTesting,
  onClose,
}: {
  title: string;
  playStore: string;
  closedTesting: ClosedTesting;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Start the guide with sound; if the browser blocks that, fall back to muted playback.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => {});
    });
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-md" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white dark:bg-gray-900 shadow-2xl shadow-emerald-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 bg-linear-to-r from-emerald-500 to-teal-600">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white/80"></span>
            </span>
            <i className="fas fa-flask text-white text-sm"></i>
            <span className="text-white text-sm font-bold tracking-widest uppercase">
              Closed Testing · {title}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors duration-200 cursor-pointer border-0"
            aria-label="Close"
          >
            <i className="fas fa-times text-sm"></i>
          </button>
        </div>

        {/* How-to video */}
        <div className="bg-black aspect-video">
          <video
            ref={videoRef}
            src={closedTesting.video}
            poster={closedTesting.poster}
            className="w-full h-full object-contain"
            playsInline
            controls
          />
        </div>

        {/* Steps */}
        <div className="p-5 sm:p-6 space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {title} is in closed testing on Google Play. Join the testers group
            first, and the app becomes available to your Google account.
          </p>
          <ol className="space-y-3">
            <li className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
                1
              </span>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Join the testers group
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sign in with the same Google account you use on Google Play.
                </p>
              </div>
              <a
                href={closedTesting.groupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold no-underline hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors duration-200 shrink-0"
              >
                <i className="fas fa-users"></i>
                Join Google Group
              </a>
            </li>
            <li className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white">
                2
              </span>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Install from Google Play
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Open the store link with that same account, then tap Install.
                </p>
              </div>
              <a
                href={playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-linear-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold no-underline hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shrink-0"
              >
                <i className="fab fa-google-play"></i>
                Open in Google Play
              </a>
            </li>
          </ol>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            <i className="fas fa-circle-info mr-1"></i>
            App not showing? Check that Google Play is signed in with the same
            account, wait a few minutes, then reopen the link, or{" "}
            <a
              href={optInUrl(playStore)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-600 dark:text-emerald-400 underline"
            >
              opt in on the web
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
