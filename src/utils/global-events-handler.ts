type CustomEvent = 'keypress';

function addListener(
  customEvent: CustomEvent,
  callback: (e: KeyboardEvent) => void
) {
  window.addEventListener(customEvent, callback);
}

function removeListener(
  customEvent: CustomEvent,
  callback: (e: KeyboardEvent) => void
) {
  window.removeEventListener(customEvent, callback);
}

export {};
