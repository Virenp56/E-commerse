import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    HeaderComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
