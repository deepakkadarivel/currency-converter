export function restrictToNumber(value) {
  return value.replace(/[^0-9.]+/g, "");
}

export function formatNumber(value) {
  return Number(
    (Math.floor(value * 10000) / 10000).toFixed(4)
  );
}