type MakeKeyOptional<T extends {}, K extends keyof T> = {
  [C in Exclude<keyof T, K>]: T[C]
} &
  { [D in K]?: T[D] };
