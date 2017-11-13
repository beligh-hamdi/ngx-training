import {Component, Input, OnChanges, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Location} from '@angular/common';
import {Contact} from '../../models/contact';
import {Subscription} from 'rxjs/Subscription';
import {ContactService} from '../../services/contact.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContactDetailsComponent implements OnInit, OnChanges, OnDestroy  {
  @Input() contact: Contact;
  subscriptions: Subscription[] = [];

  constructor(private contactService: ContactService,
              private activatedRoute: ActivatedRoute,
              private location: Location) {}

  ngOnInit() {
    this.fetchContact();
  }

  ngOnChanges(changes) {
    console.log('ContactDetailsComponent -  ngOnChanges: ', changes);
  }

  save(): void {
    const subscription = this.contactService.update(this.contact).subscribe((data) => {
      this.goBack();
    });
    this.subscriptions.push(subscription);
  }

  fetchContact() {
    const subscription = this.activatedRoute.paramMap
      .switchMap((params: ParamMap) => this.contactService.getById(+params.get('id')))
      .subscribe(contact => {
        this.contact = contact;
        this.contactService.setContact(contact);
      });
    this.subscriptions.push(subscription);
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy() {
    this.subscriptions.map((subscription) => {
      subscription.unsubscribe();
    });
  }
}
