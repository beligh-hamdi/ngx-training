import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MessageService} from '../../../../core/services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(private messageService: MessageService) {}

  sendMessage(): void {
    // send message to subscribers via observable subject
    this.messageService.sendMessage('Message from Home Component to App Component!');
  }

  clearMessage(): void {
    // clear message
    this.messageService.clearMessage();
  }

  ngOnInit() {
  }

}
