"use client";

import { useEffect } from "react";

export function useKeyboardShortcut(
  key: string,
  callback: () => void,
  modifiers: { ctrl?: boolean; meta?: boolean; alt?: boolean } = {}
) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const { ctrl = false, meta = false, alt = false } = modifiers;

      if (
        e.key === key &&
        (!ctrl || e.ctrlKey) &&
        (!meta || e.metaKey) &&
        (!alt || e.altKey)
      ) {
        e.preventDefault();
        callback();
      }
    };

    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [key, callback, modifiers]);
}