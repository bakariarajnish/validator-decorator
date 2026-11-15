import { ValidatorConfig } from "./interface";

const registerValidators: ValidatorConfig = {};

export function Required(target: any, propertyName: string) {
  const className = target.constructor.name;
  registerValidators[className] = {
    ...(registerValidators[className] || {}),
    [propertyName]: [
      ...(registerValidators[className]?.[propertyName] || []),
      "required",
    ],
  };
}

export function PositiveNumber(target: any, propertyName: string) {
  const className = target.constructor.name;
  registerValidators[className] = {
    ...(registerValidators[className] || {}),
    [propertyName]: [
      ...(registerValidators[className]?.[propertyName] || []),
      "positive",
    ],
  };
}

/*
  Validator function will do validation for all properties which are passed in obj for
  type of validation set in registerValidators config object

  Will return result saying {propertyName: {typeOfValidity: result(true or false)}, isValid: true/false};
*/
export function Validator(obj: any) {
  const validatorConfigObj = registerValidators[obj.constructor.name];
  if (!validatorConfigObj) {
    return { isValid: true };
  }
  const validationResult: { [propName: string]: { [prop: string]: boolean } } =
    {};
  for (let prop in validatorConfigObj) {
    for (let validator of validatorConfigObj[prop] || []) {
      switch (validator) {
        case "required":
          const result = obj[prop] !== "" ? true : false;
          if (!validationResult[prop]) {
            validationResult[prop] = {};
          }
          validationResult[prop][validator] = result;
          break;
        case "positive":
          if (!validationResult[prop]) {
            validationResult[prop] = {};
          }
          validationResult[prop][validator] = obj[prop] > 0;
          break;
      }
    }
  }
  const validationResponse = {
    isValid: true,
    ...validationResult,
  };
  for (let prop in validationResult) {
    for (let insideProp in validationResult[prop]) {
      if (!validationResult[prop][insideProp]) {
        validationResponse.isValid = false;
      }
    }
  }
  return validationResponse;
}
