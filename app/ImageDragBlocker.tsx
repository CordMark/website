"use client";

import { useEffect } from "react";

const NON_DRAGGABLE_SELECTOR = "img, a";

function disableElementDrag(root: ParentNode | Element) {
  if (root instanceof HTMLElement && root.matches(NON_DRAGGABLE_SELECTOR)) {
    root.draggable = false;
    root.setAttribute("draggable", "false");
  }

  root.querySelectorAll<HTMLElement>(NON_DRAGGABLE_SELECTOR).forEach((element) => {
    element.draggable = false;
    element.setAttribute("draggable", "false");
  });
}

function isNonDraggableTarget(target: EventTarget | null) {
  return target instanceof Element && target.closest(NON_DRAGGABLE_SELECTOR) !== null;
}

export function ImageDragBlocker() {
  useEffect(() => {
    disableElementDrag(document);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            disableElementDrag(node);
          }
        });
      });
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });

    const preventElementDrag = (event: DragEvent) => {
      if (isNonDraggableTarget(event.target)) {
        event.preventDefault();
      }
    };

    document.addEventListener("dragstart", preventElementDrag, true);
    document.addEventListener("drop", preventElementDrag, true);

    return () => {
      observer.disconnect();
      document.removeEventListener("dragstart", preventElementDrag, true);
      document.removeEventListener("drop", preventElementDrag, true);
    };
  }, []);

  return null;
}
