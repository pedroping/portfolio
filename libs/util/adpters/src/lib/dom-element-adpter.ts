export class DomElementAdpter {
  static getTransformValues(transform: string) {
    if (!transform) return { x: -1, y: -1 };
    const splitedLabel = transform.split("(")[1].replace(")", "");
    const splitedValues = splitedLabel
      .replace(",", "")
      .split(" ")
      .map((value) => +value.replace(",", "").replace("px", ""));

    return { x: splitedValues[0], y: splitedValues[1] };
  }

  static setTransform(element: HTMLElement, x: number, y: number) {
    element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  static setZIndex(element: HTMLElement, zIndex: string) {
    element.style.zIndex = zIndex;
  }

  static setTransition(element: HTMLElement, secondTime = 2) {
    element.style.transition = `all .${secondTime}s ease`;
  }

  static setOnlyTransformTransition(element: HTMLElement, secondTime = 2) {
    element.style.transition = `transform .${secondTime}s ease`;
  }

  static removeTransition(element: HTMLElement) {
    element.style.transition = "none";
  }

  static getNumberFromSize(value: string) {
    return +value.replace("px", "");
  }
}
