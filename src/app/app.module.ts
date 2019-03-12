import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AnalyticalMethodModule } from './analytical-method/analytical-method.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AnalyticalMethodModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
