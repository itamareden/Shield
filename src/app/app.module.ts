import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { StopperComponent } from './components/stopper/stopper.component';
import { StopperRecordsComponent } from './components/stopper-records/stopper-records.component';

@NgModule({
  declarations: [
    AppComponent,
    StopperComponent,
    StopperRecordsComponent
  ],
  imports: [
    BrowserModule, 
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
