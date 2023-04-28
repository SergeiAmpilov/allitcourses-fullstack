

export interface IConfigservice {
  get: <T extends string | number>(key: string) => T;
}