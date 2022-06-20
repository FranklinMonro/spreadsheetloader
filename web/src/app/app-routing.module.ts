import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoxNumbersComponent } from './box-numbers/box-numbers.component';
import { CompareComponent } from './compare/compare.component';
import { ResponseTimerComponent } from './response-timer/response-timer.component';
import { SerialNumbersComponent } from './serial-numbers/serial-numbers.component';
import { SmartloadproductsComponent } from './smartloadproducts/smartloadproducts.component';
import { StorecampaignsComponent } from './storecampaigns/storecampaigns.component';

const routes: Routes = [
  { path: 'serialnumbers', component: SerialNumbersComponent },
  { path: 'storenames', component: StorecampaignsComponent },
  { path: 'boxnumbers', component: BoxNumbersComponent },
  { path: 'compare', component: CompareComponent },
  { path: 'response', component: ResponseTimerComponent },
  { path: 'smartload', component: SmartloadproductsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
