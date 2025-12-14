export type BadgeType = {
  variant?: BadgeVariant;
};

export type BadgeVariant =
  | "hot"
  | "urgent"
  | "superhot"
  | "featured"
  | "spotlight"
  | "";
