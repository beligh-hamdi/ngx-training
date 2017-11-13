import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule, MatListModule
} from '@angular/material';
import {ApiService} from './services/api.service';
import {MessageService} from './services/message.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,

    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ],
  declarations: [PageNotFoundComponent, LayoutComponent, NavbarComponent],
  exports: [
    PageNotFoundComponent,
    LayoutComponent,
    NavbarComponent
  ],
  providers: [ApiService, MessageService]
})
export class CoreModule { }
