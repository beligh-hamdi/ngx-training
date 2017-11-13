import { Injectable } from '@angular/core';
import {ContactApiService} from './contact-api.service';
import {Observable} from 'rxjs/Observable';
import {Contact} from '../models/contact';
import {Subject} from 'rxjs/Subject';


@Injectable()
export class ContactService {
  private contacts$ = new Subject<any>();
  private contact$ = new Subject<any>();

  constructor(private api: ContactApiService) { }

  setContacts(contacts: Array<Contact>) {
    this.contacts$.next({ action: 'CONTACTS_FETCH', payload: contacts });
  }

  getContacts(): Observable<any> {
    return this.contacts$.asObservable();
  }

  setContact(contact: Contact) {
    this.contact$.next({ action: 'CONTACT_FETCH', payload: contact });
  }

  getContact(): Observable<any> {
    return this.contact$.asObservable();
  }

  // POST /contacts
  add(contact: Contact): Observable<Contact> {
    return this.api.add(contact);
  }

  // DELETE /contacts/:id
  remove(contactId: number): Observable<Contact> {
    return this.api.deleteById(contactId);
  }

  // PUT /contacts/:id
  update(contact: Contact): Observable<Contact> {
    return this.api.update(contact);
  }

  // GET /contacts
  getAll(): Observable<Contact[]> {
    return this.api.getAll();
  }

  // GET /contacts/:id
  getById(contactId: number): Observable<Contact> {
    return this.api.getById(contactId);
  }

  // GET /contacts?name=term
  search(term: string): Observable<Contact[]> {
    return this.api.search(term);
  }

}
