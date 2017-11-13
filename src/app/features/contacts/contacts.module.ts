import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactContainerComponent } from './components/contact-container/contact-container.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

import { ContactService } from './services/contact.service';
import { ContactApiService } from './services/contact-api.service';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatListModule} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    ContactsRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    MatListModule
  ],
  providers: [ContactService, ContactApiService],
  declarations: [ContactContainerComponent, ContactListComponent, ContactDetailsComponent, ContactFormComponent]
})
export class ContactsModule { }
