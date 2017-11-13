import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Contact} from '../../models/contact';
import {ContactService} from '../../services/contact.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContactListComponent implements OnInit, OnDestroy {
  @Input() contacts: Array<Contact> = [];
  selectedContact: Contact;

  subscriptions: Subscription[] = [];

  constructor(private contactService: ContactService) {
    const subscription1 = this.contactService.getContacts().subscribe((contacts) => {
        this.contacts = contacts.payload;
      }
    );
    this.subscriptions.push(subscription1);

    const subscription2 = this.contactService.getContact().subscribe((contact) => {
      this.selectedContact = Object.assign({}, contact.payload);
    });
    this.subscriptions.push(subscription2);
  }

  ngOnInit() {
  }

  onSelectedContact(contact) {
    this.contactService.setContact(contact);
  }


  ngOnDestroy() {
    this.subscriptions.map((subscription) => {
      subscription.unsubscribe();
    });
  }

}
