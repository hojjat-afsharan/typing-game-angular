import { ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { lorem, hacker, image, commerce } from 'faker';
import { StopWatch } from 'stopwatch-node';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  gameStarted = false;
  randomText: string = '';
  currentTyped = '';
  started = false;
  ended = false;
  timeElapsed = 0;
  typeSpeed = 0;



  ngOnInit() {
    //this.getRandomText();
  }

  choose(difficulty: number) {
    switch (difficulty) {
      case 0:
        this.randomText = commerce.productName();
        break;

      case 1:
        this.randomText = hacker.phrase();
        break;

      case 2:
        this.randomText = lorem.paragraphs();
        break;

      case 3:
        this.randomText = image.dataUri();
        break;

      default:
        break;
    }
    this.gameStarted = true;
  }

  getRandomText() {
    this.randomText = lorem.sentence();
  }

  splittedRandomText() {
    return this.randomText.split(/()/).filter(String);
  }

  getInput(target: any) {
    this.currentTyped = target.value;
    if (!this.started) {
      console.log('started');
      this.started = true;
      this.startTyping();
    }

    if (this.currentTyped.length === this.randomText.length && !this.ended) {
      this.ended = true;
      this.stopTyping();
    }
  }

  getColor(index: number): string {
    if (this.currentTyped[index]) {
      if (this.currentTyped[index] === this.randomText[index])
        return 'rgb(21, 196, 21)';
      else if (this.currentTyped[index] !== this.randomText[index])
        return 'rgb(228, 42, 35)';
    }
    return 'rgb(116, 114, 113)';
  }

  getBackgroundColor(index: number): string {
    if (this.currentTyped[index]) {
      if (
        this.randomText[index] === ' ' &&
        this.randomText[index] !== this.currentTyped[index]
      )
        return 'rgb(228, 42, 35)';
    }
    return 'white';
  }

  sw = new StopWatch('sw');
  startTyping() {
    this.sw.start('Task 1');
  }

  stopTyping() {
    this.sw.stop();

    this.timeElapsed = this.sw.getTotalTime() / 1000;

    let words = this.randomText.split(' ').length;
    console.log(words);
    this.typeSpeed = Math.floor((words * 60) / this.timeElapsed);


  }

  reset() {
    this.started = false;
    this.ended = false;

    this.currentTyped = '';
    if (this.sw.isRunning()) this.sw.stop();
    this.timeElapsed = 0;
    this.typeSpeed = 0;
    this. gameStarted = false;
  }
}
