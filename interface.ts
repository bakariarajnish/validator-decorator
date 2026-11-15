export interface ValidatorConfig {
  [property: string]: {
    [validatableProperty: string]: string[]; //Course : { courseName: ['Required', 'MinCharacter']}
  };
}
