import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ui-turn-off-splash-screen',
  templateUrl: './ui-turn-off-splash-screen.component.html',
  styleUrls: ['./ui-turn-off-splash-screen.component.scss'],
  standalone: true,
})
export class UiTurnOffSplashScreenComponent implements OnInit {

  ngOnInit() {
    const audio = new Audio('/assets/audios/shut-down.mp3');
    audio.load();
    audio.play();
  }
}
