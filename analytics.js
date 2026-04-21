(function () {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
  }

  const gtag = window.gtag;
  function trackEvent(eventName, params) {
    gtag("event", eventName, params || {});
  }

  function getTrackableTarget(target) {
    if (!(target instanceof Element)) return null;
    return target.closest("[data-analytics-event], button, a");
  }

  function inferEventName(element) {
    const explicit = element.getAttribute("data-analytics-event");
    if (explicit) return explicit;

    if (element instanceof HTMLAnchorElement) return "link_click";
    if (element instanceof HTMLButtonElement) return "button_click";
    return "element_click";
  }

  document.addEventListener("click", function (event) {
    const element = getTrackableTarget(event.target);
    if (!element) return;

    const eventName = inferEventName(element);
    const params = {
      tag: element.tagName.toLowerCase(),
      text: (element.textContent || "").trim().slice(0, 80),
    };

    if (element instanceof HTMLAnchorElement && element.href) {
      params.href = element.href;
    }

    trackEvent(eventName, params);
  });

  window.analytics = { trackEvent: trackEvent };
})();
