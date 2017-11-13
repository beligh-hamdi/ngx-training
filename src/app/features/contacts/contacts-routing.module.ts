import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactContainerComponent } from './components/contact-container/contact-container.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

const routes: Routes = [
  {
    path: '',
    component: ContactContainerComponent,
    children : [
      { path: '', component: ContactListComponent },
      { path: 'details/:id', component: ContactDetailsComponent },
      { path: 'new', component: ContactFormComponent },
      { path: 'edit/:id', component: ContactFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
