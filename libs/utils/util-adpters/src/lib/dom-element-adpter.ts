import { debounceTime, fromEvent, take } from 'rxjs';

export class DomElementAdpter {
  static getTransformValues(transform: string) {
    if (!transform) return { x: -1, y: -1 };
    const splitedLabel = transform.split('(')[1].replace(')', '');
    const splitedValues = splitedLabel
      .replace(',', '')
      .split(' ')
      .map((value) => +value.replace(',', '').replace('px', ''));

    return { x: splitedValues[0], y: splitedValues[1] };
  }

  static setDisplay(element: HTMLElement, show: boolean) {
    element.style.display = show ? 'block' : 'none';
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
    element.style.transition = 'none';
  }

  static getNumberFromSize(value: string) {
    return +value.replace('px', '');
  }

  static getTranslate3d(x: number, y: number) {
    return `translate3d(${x}px, ${y}px, 0)`;
  }

  static validateFullScreen(element1: HTMLElement, element2: HTMLElement) {
    const zIndex1 = element1.style.zIndex || 0;
    const zIndex2 = element2.style.zIndex || 0;
    return zIndex1 > zIndex2;
  }

  static elementAboveOther(element1: HTMLElement, element2: HTMLElement) {
    const domRect1 = element1.getBoundingClientRect();
    const domRect2 = element2.getBoundingClientRect();

    return !(
      domRect1.top > domRect2.bottom ||
      domRect1.right < domRect2.left ||
      domRect1.bottom < domRect2.top ||
      domRect1.left > domRect2.right
    );
  }

  static afterTransitions(element: HTMLElement) {
    return fromEvent<TransitionEvent>(element, 'transitionstart').pipe(
      debounceTime(100),
      take(1)
    );
  }
}
