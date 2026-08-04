export const Status = {
    Enable: "Enable",
    Disable: "Disable",
} as const;

export type Status =
    typeof Status[keyof typeof Status];
