declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    analytics?: {
      trackEvent: (eventName: string, params?: Record<string, unknown>) => void;
    };
  }
}

const ensureGtag = (): ((...args: unknown[]) => void) => {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer.push(args);
    };
  }
  return window.gtag;
};

const gtag = ensureGtag();

export const trackEvent = (eventName: string, params: Record<string, unknown> = {}): void => {
  gtag("event", eventName, params);
};

const getTrackableTarget = (target: EventTarget | null): HTMLElement | null => {
  if (!(target instanceof Element)) return null;
  return target.closest<HTMLElement>("[data-analytics-event], button, a");
};

const inferEventName = (element: HTMLElement): string => {
  const explicit = element.getAttribute("data-analytics-event");
  if (explicit) return explicit;

  if (element instanceof HTMLAnchorElement) return "link_click";
  if (element instanceof HTMLButtonElement) return "button_click";
  return "element_click";
};

const setupDefaultTracking = (): void => {
  document.addEventListener("click", (event: MouseEvent) => {
    const element = getTrackableTarget(event.target);
    if (!element) return;

    const eventName = inferEventName(element);
    const params: Record<string, unknown> = {
      tag: element.tagName.toLowerCase(),
      text: (element.textContent || "").trim().slice(0, 80),
    };

    if (element instanceof HTMLAnchorElement && element.href) {
      params.href = element.href;
    }

    trackEvent(eventName, params);
  });
};

setupDefaultTracking();

window.analytics = { trackEvent };
