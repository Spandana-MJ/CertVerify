// utils/date.js
export function formatDate(dateInput) {
  if (!dateInput) return "";

  let d;

  // If it's a number (timestamp)
  if (!isNaN(dateInput)) {
    const ts =
      dateInput.toString().length === 10
        ? dateInput * 1000 // seconds → ms
        : dateInput; // already ms
    d = new Date(ts);
  } else {
    // Otherwise assume it's a string (ISO like "2025-08-18")
    d = new Date(dateInput);
  }

  if (isNaN(d)) return "";

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
}
