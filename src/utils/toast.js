/**
 * Display a luxury-styled toast notification at the top-right of the screen.
 * @param {string} message - Message to display
 * @param {string} type - 'success' | 'info' | 'error'
 */
export const showToast = (message, type = "success") => {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    
    // Check theme from document body or root to apply theme variables properly
    const isLight = document.body.classList.contains("light") || document.documentElement.classList.contains("light");
    if (isLight) {
      container.className = "light";
    } else {
      container.className = "dark";
    }
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast-message ${type}`;

  const iconClass = type === "success" 
    ? "fa-solid fa-circle-check" 
    : type === "error" 
      ? "fa-solid fa-circle-xmark" 
      : "fa-solid fa-circle-info";

  toast.innerHTML = `
    <i class="${iconClass}"></i>
    <span class="toast-text">${message}</span>
  `;

  container.appendChild(toast);

  // Trigger browser paint to ensure transition triggers
  // eslint-disable-next-line no-unused-expressions
  toast.offsetHeight;

  toast.classList.add("show");

  // Dismiss timer
  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hide");
    
    // Wait for transition, then remove from DOM
    setTimeout(() => {
      toast.remove();
      // Clean container if empty
      if (container.childNodes.length === 0) {
        container.remove();
      }
    }, 400);
  }, 3000);
};
