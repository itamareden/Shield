import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stopper-records',
  templateUrl: './stopper-records.component.html',
  styleUrls: ['./stopper-records.component.scss']
})
export class StopperRecordsComponent implements OnInit {

  @Input() records: Array<string>;
  @Output() clickedRemoveRecord = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  removeRecord(index: number){
    this.clickedRemoveRecord.emit(index);
  }

}
