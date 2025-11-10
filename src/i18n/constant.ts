// src/i18n/constants.ts
export const modules = import.meta.glob("./translations/*.ts", { eager: true });

export const languages = Object.keys(modules).map((path) =>
  path.split("/").pop()!.replace(".ts", "")
) as string[];

export type Language = (typeof languages)[number];
