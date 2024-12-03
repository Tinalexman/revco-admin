export function setRevcoColorTheme(state: string, root: HTMLElement) {
  if (state === "taraba") {
    setTarabaColorScheme(root);
  } else {
    setDefaultColorScheme(root);
  }
}

export function setTarabaColorScheme(root: HTMLElement) {
  root.style.setProperty("--revco-primary", "#00923F");
  root.style.setProperty("--revco-primary-accent", "#E6F4EC");
  root.style.setProperty("--revco-secondary", "#425D8A");
  root.style.setProperty("--revco-secondary-accent", "#ECEFF3");
}

export function setDefaultColorScheme(root: HTMLElement) {
  root.style.setProperty("--revco-primary", "#6500E0");
  root.style.setProperty("--revco-primary-accent", "#F0E6FC");
  root.style.setProperty("--revco-secondary", "#425D8A");
  root.style.setProperty("--revco-secondary-accent", "#ECEFF3");
}
