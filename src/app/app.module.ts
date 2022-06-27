import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MonthComponent } from './components/month/month.component';
import { OrganizerComponent } from './components/organizer/organizer.component';
import { MomentPipe } from './components/pipes/moment.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    MonthComponent,
    OrganizerComponent,
    MomentPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
