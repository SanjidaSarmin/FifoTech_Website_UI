import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/Contact/contact.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit{
  
  messagelist: any[] = [];

  constructor(private messageService: ContactService) {}
  ngOnInit(): void {
  this.loadMessages();
  }

  loadMessages(): void {
    this.messageService.getAllMessages().subscribe({
      next: (data) => this.messagelist = data,
      error: (err) => console.error('Failed to fetch messages:', err)
    });
  }
}
