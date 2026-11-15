import { Required, PositiveNumber, Validator } from "./Validator.js";

class Course {
  @Required
  courseName: string;
  @PositiveNumber
  coursePrice: number;

  constructor(name: string, price: number) {
    this.courseName = name;
    this.coursePrice = price;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const courseTitleEl = document.getElementById(
    "courseTitle",
  ) as HTMLInputElement;
  const coursePriceEl = document.getElementById(
    "coursePrice",
  ) as HTMLInputElement;

  const courseTitle = courseTitleEl.value;
  const coursePrice = +coursePriceEl.value;
  const newCourse = new Course(courseTitle, coursePrice);
  const validityResult = Validator(newCourse);
  if (!validityResult?.isValid) {
    alert("Invalid Course data");
    return;
  }
  console.log(newCourse);
});
