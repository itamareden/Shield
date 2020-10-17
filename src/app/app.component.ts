import { Component , OnInit} from '@angular/core';
import { StateStorageService } from './services/state-storage/state-storage.service';
import { State } from './models/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'shield';
  state: State;

  constructor(private stateStorageService: StateStorageService){}

  ngOnInit(): void {
    // get data from browser's local storage
    this.state =  this.stateStorageService.initState();
  }

  updateCounter(timestamp: number){
    this.stateStorageService.updateCounter(timestamp);
  }

  addRecordToList(record: string) {
    this.state.records.push(record);
    this.stateStorageService.updateRecords(this.state.records);
  }

  removeRecordFromList(index: number) {
    this.state.records.splice(index, 1);
    this.stateStorageService.updateRecords(this.state.records);
  }

  resetApp() {
    this.stateStorageService.resetState();
    this.state.counter = null;
    this.state.records = [];
  }
}
