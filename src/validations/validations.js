export function isEmail(value) {
  return value.includes("@");
}

export function isEmpty(value) {
  return value.trim() !== "";
}
