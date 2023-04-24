export * as Time from "./time";

export function now() {
  return new Date().toISOString();
}

export function currentMonth(): number {
  return new Date().getMonth() + 1;
}
