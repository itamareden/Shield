import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { faPlay, faPause, faClock, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-stopper',
  templateUrl: './stopper.component.html',
  styleUrls: ['./stopper.component.scss']
})
export class StopperComponent implements OnInit {

  @Input() value: number;
  @Output() toggledStopper = new EventEmitter<number>();
  @Output() clickedAddRecord = new EventEmitter<string>();
  @Output() clickedReset = new EventEmitter<null>();

  stopperState: StopperState = StopperState.PAUSE;
  secondHundredths: number = 0;
  secondTenths: number = 0;
  secondUnits: number = 0;
  secondTens: number = 0;
  minuteUnits: number = 0;
  minuteTens: number = 0;
  stopper: Observable<number>;
  stopperSubscription: Subscription;
  alreadyAddedToRecords = false;
  playIcon = faPlay;
  pauseIcon = faPause;
  stopperIcon = faClock;
  removeIcon = faTrashAlt;
  blink = false;

  constructor() { }

  ngOnInit(): void {
    // define interval to emit value every 1 hundredth of a seconds (10 milliseconds)
    this.stopper = interval(10);
    if(this.value){
      // if counter has a value in local storage start the stopper on load and initialize it
      // with the counter's value
      this.parseTimestampToStopper(this.value);
      this.stopperSubscription = this.stopper.subscribe(() => this.setStopperDigits());
      this.stopperState = StopperState.PLAY;
    }
  }

  toggleStopperState() {
    if(this.stopperState === StopperState.PAUSE){
      // start stopper
      this.stopperSubscription = this.stopper.subscribe(() => this.setStopperDigits());
      // in local storage, save current timestamp adjusted for current counter value
      this.toggledStopper.emit(this.generateCounterTimestamp());
      this.stopperState = StopperState.PLAY;
      this.alreadyAddedToRecords = false;
    }
    else{
      // stop stopper
      this.stopperSubscription.unsubscribe();
      // reset counter value in local storage
      this.toggledStopper.emit(null);
      this.stopperState = StopperState.PAUSE;
      this.blink = false;
    }
  }

  setStopperDigits(){
    // update second hundredths on each interval emission
    this.secondHundredths = (this.secondHundredths + 1) % 10;
    if(this.secondHundredths === 0){
      // update seconds tenths only when second hundredth finish a full round (10 second hundredth)
      // and so on...
      this.secondTenths = (this.secondTenths + 1) % 10;
      if(this.secondTenths === 0){
        this.secondUnits = (this.secondUnits + 1) % 10;
        // blink every second
        this.blink = !this.blink;
        if(this.secondUnits === 0){
          this.secondTens = (this.secondTens + 1) % 6;
          if(this.secondTens === 0){
            this.minuteUnits = (this.minuteUnits + 1) % 10;
            if(this.minuteUnits === 0){
              this.minuteTens = (this.minuteTens + 1) % 6;
            }
          }
        }
      }
    }
  }

  parseTimestampToStopper(timestamp: number) {
    // convert timestamp to stopper digits
    if(timestamp !== null){
      const now = new Date().getTime();
      let elapsedTime = now - timestamp;
      // (1000 * 60 * 10) is the amount of milliseconds in 10 minutes and so on.. 
      this.minuteTens = Math.floor(elapsedTime / (1000 * 60 * 10)) % 6;
      this.minuteUnits = Math.floor(elapsedTime / (1000 * 60)) % 10;
      this.secondTens = Math.floor(elapsedTime / (1000 * 10)) % 6;
      this.secondUnits = Math.floor(elapsedTime / 1000) % 10;
      this.secondTenths = Math.floor(elapsedTime / 100) % 10;
      this.secondHundredths = Math.floor(elapsedTime / 10) % 10;
    }
    else{
      [this.minuteTens, this.minuteUnits, this.secondTens, this.secondUnits, this.secondTenths, this.secondHundredths] = Array(6).fill(0);
    }
  }

  // when user clicks on play, then pause after a few seconds and then clicks play again. 
  // we need to update counter in local storage with current timestamp minus stopper value converted
  // to milliseconds. 
  generateCounterTimestamp(): number {
    const now = new Date().getTime();
    const elapsedTime = this.extractElapsedTimeFromStopper();
    return now - elapsedTime;
  }

  extractElapsedTimeFromStopper(): number {
    // return the amount of milliseconds in stopper's value
    return this.minuteTens * (1000 * 60 * 10) + 
           this.minuteUnits * (1000 * 60) + 
           this.secondTens * (1000 * 10) + 
           this.secondUnits * 1000 + 
           this.secondTenths * 100 + 
           this.secondHundredths * 10;
  }

  stringifyStopper(): string {
    return `${this.minuteTens}${this.minuteUnits}:${this.secondTens}${this.secondUnits}.${this.secondTenths}${this.secondHundredths}`;
  }

  getStopperStateIcon() {
    return this.stopperState === StopperState.PLAY ? this.pauseIcon : this.playIcon;
  }

  getPlayBtnValue(): string {
    return this.stopperState === StopperState.PLAY ? StopperState.PAUSE.toString() : StopperState.PLAY.toString();
  }

  addToRecords(){
    this.clickedAddRecord.emit(this.stringifyStopper());
    this.alreadyAddedToRecords = true;
  }

  isDisableRecordAddition(): boolean {
    return this.stopperState === StopperState.PLAY || this.stringifyStopper() === '00:00.00' || this.alreadyAddedToRecords
  }

  reset() {
    this.stopperSubscription?.unsubscribe();
    this.parseTimestampToStopper(null);
    this.clickedReset.emit();
    this.stopperState = StopperState.PAUSE;
    this.blink = false;
  }

}

enum StopperState {
  PLAY = 'Play',
  PAUSE = 'Pause'
}
