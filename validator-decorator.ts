export interface ValidatorConfig {
  [property: string]: {
    [prop: string]: string[];
  };
}

export function Required(target: any, propertyName: string) {}
export function PositiveNumber(target: any, propertyName: string) {}
