import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Contact} from '../../models/contact';
import {Subscription} from 'rxjs/Subscription';
import {ContactService} from '../../services/contact.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact-container',
  templateUrl: './contact-container.component.html',
  styleUrls: ['./contact-container.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContactContainerComponent implements OnInit, OnDestroy {
  contacts: Contact[];
  contact: Contact;
  subscriptions: Subscription[] = [];

  constructor(private contactService: ContactService,
              private router: Router) { }

  ngOnInit() {
    this.loadContacts();

    const subscription = this.contactService.getContact().subscribe((contact) => {
        this.contact = contact.payload;
      }
    );
    this.subscriptions.push(subscription);
  }

  loadContacts() {
    const subscription = this.contactService.getAll().subscribe((contacts) => {
        this.contacts = contacts;
        this.contactService.setContacts(contacts);
      }
    );
    this.subscriptions.push(subscription);
  }

  goToDetail(): void {
    this.router.navigate(['/contacts/details', this.contact.id]);
  }

  remove(contact: Contact): void {
    const subscription = this.contactService.remove(contact.id).subscribe((data) => {
        // this.contacts = this.contacts.filter(h => h !== contact);
        // if (this.selectedContact === contact) { this.selectedContact = null; }
        this.loadContacts();
      });
    this.subscriptions.push(subscription);
  }

  add(contact: Contact): void {
    const subscription = this.contactService.add(contact).subscribe((data) => {
        // this.contacts.push(data);
        this.loadContacts();
      });
    this.subscriptions.push(subscription);
  }

  getDetails(id: number): void {
    const subscription = this.contactService.getById(id).subscribe((data) => {
        this.contact = data;
      });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.map((subscription) => {
      subscription.unsubscribe();
    });
  }
}
