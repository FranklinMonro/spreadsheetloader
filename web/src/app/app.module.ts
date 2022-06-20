import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NgxDropzoneModule } from 'ngx-dropzone';
import  {MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsComponent } from './components/components.component';
import { HeaderComponent } from './components/header/header.component';
import { SerialNumbersComponent } from './serial-numbers/serial-numbers.component';
import { StorecampaignsComponent } from './storecampaigns/storecampaigns.component';
import { BoxNumbersComponent } from './box-numbers/box-numbers.component';
import { CompareComponent } from './compare/compare.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResponseTimerComponent } from './response-timer/response-timer.component';
import { SmartloadproductsComponent } from './smartloadproducts/smartloadproducts.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    HeaderComponent,
    SerialNumbersComponent,
    StorecampaignsComponent,
    BoxNumbersComponent,
    CompareComponent,
    ResponseTimerComponent,
    SmartloadproductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    NgxDropzoneModule,
    BrowserAnimationsModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
