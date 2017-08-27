import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SidebarComponent } from './sidebar.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    SidebarComponent,
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [
      SidebarComponent,
      AppComponent
  ]
})
export class AppModule { }
