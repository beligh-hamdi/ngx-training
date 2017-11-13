import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { map} from 'rxjs/operators';

import { Contact } from '../../features/contacts/models/contact';

const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {}

  public getAllContacts(): Observable<Contact[]> {
    return this.http
      .get(API_URL + '/contacts')
      .catch(this.handleError);
  }

  public addContact(contact: Contact): Observable<Contact> {
    return this.http
      .post(API_URL + '/contacts', contact)
      .catch(this.handleError);
  }

  public getContactById(contactId: any): Observable<Contact> {
    return this.http
      .get(API_URL + '/contacts/' + contactId)
      .catch(this.handleError);
  }

  public updateContact(contact: Contact): Observable<Contact> {
    return this.http
      .put(API_URL + '/contacts/' + contact.id, contact)
      .catch(this.handleError);
  }

  public deleteContactById(contactId: any): Observable<null> {
    return this.http
      .delete(API_URL + '/contacts/' + contactId)
      .catch(this.handleError);
  }

  public searchContact(term: string): Observable<Contact[]> {
    return this.http
      .get(`${API_URL}/contacts/?name=${term}`)
      .pipe(map(response => response as Contact[]))
      .catch(this.handleError);
  }

  private handleError (error: HttpResponse<any> | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}
