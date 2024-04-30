import { take, timer } from "rxjs";

export class UtlisFunctions {
  static timerSubscription(time: number) {
    return timer(time).pipe(take(1));
  }
}
