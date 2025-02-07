import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatserviceService } from '../services/chatservice/chatservice.service';
import { Subscription, timestamp } from 'rxjs';
import { ChatMessageDTO } from '../model/messageDTO';
import { DatePipe } from '@angular/common';
import { UserService } from '../services/Userservice/user.service';
import { SessionService } from '../services/sessionManager/session.service';
import { Message } from '../interfaces/message';
import { an } from 'node_modules/@fullcalendar/core/internal-common';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.css',
})
export class ChatroomComponent implements OnInit, OnDestroy {
  senderId!: string;
  recipientId!: string;
  currentUserId = '0';
  contacts!: any[];
  messages!: any[];
  content: string = '';
  sender: any;
  recipient: any;
  roomId: string = '';
  user :any
  constructor(
    private chatserviceService: ChatserviceService,
    private datePipe: DatePipe,
    private userService: UserService,
    private session: SessionService,
    private authService: AuthService

  ) {}

  ngOnInit(): void {

    // this.senderId = this.session.getUserDetails()?.id || '';
    this.user = this.authService.getCurrentUserId()
    console.log('senderId---------', this.senderId);

    this.userService.getUserByEmailAndUsername(this.user.email, this.user.username).subscribe((sender) => {
      this.senderId = sender.id
      this.sender = sender;
      console.log('sender', this.sender);
    });

    this.userService.getAllUsers().subscribe((contact) => {
      const contacts = contact.filter((contact: any) => {
        if (contact.id !== this.senderId) {
          return contact;
        }
      });
      console.log(contacts);
      this.contacts = contacts;
      console.log(contact);
      this.recipient = this.contacts[0];

      this.userService.getUserById(this.recipient.id).subscribe((recipient) => {
        this.recipient = recipient;
        this.selectContact(this.recipient.id);
        console.log(this.recipient.id);
      });
    });

    this.updateTimeAgo();
    // console.log("test");
    // this.joinRoom()
  }
  messageSubscription!: any;

  joinRoom() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }

    this.roomId = this.chatserviceService.joinRoom(
      this.sender.id,
      this.recipient.id
    );
    this.messageSubscription = this.chatserviceService.receiveMessage(
      (data) => {
        console.log('received a message', data);
        const message: any = { ...data };

        if (message.senderId === this.sender.id) {

          message.sender = this.sender; 
          message.recipient = this.recipient; 
        } else {
          message.sender = this.recipient; 
          message.recipient = this.sender; 
        }

        if (!this.messages.find((m) => m.id === message.id)) {
          this.messages.push(message);
        }
        console.log(this.messages);
      }
    );
  }
  sendMessage(): void {
    this.chatserviceService.sendMessage(
      this.senderId,
      this.recipient.id,
      this.content
    );
    this.content = '';
  }

  selectContact(id: string) {
    console.log('-------------', id);
    this.messages = [];
    this.recipientId = id;
    this.userService.getUserById(this.recipientId).subscribe((recipient) => {
      this.recipient = recipient;
      console.log('test for convo', this.recipient, this.senderId);
      this.chatserviceService
        .getConversation(this.senderId, this.recipient.id)
        .subscribe((messages) => {
          this.messages = this.mapMessage(
            messages,
            this.sender,
            this.recipient
          );
          console.log(this.messages);
          this.joinRoom();
        });
    });
    console.log(this.recipient);
  }
  updateTimeAgo(): void {
    setInterval(() => {}, 10000);
  }
  mapMessage(messages: any, sender: any, recipeint: any) {
    return messages.map((message: any) => {
      const newmessage = { ...message };
      if (newmessage.senderId === sender.id) {
        newmessage.sender = sender;
        newmessage.recipient = recipeint;
      } else {
        newmessage.sender = recipeint;
        newmessage.recipient = sender;
      }
      return newmessage;
    });
  }
  generateAvatarUrl(username: string): string {
    const length = 1;
    const rounded = true;
    const bold = true;
    const background = '770b7b';
    const color = 'ffffff';
    const size = 128;
    return `https://ui-avatars.com/api/?length=${length}&name=${username}&rounded=${rounded}&bold=${bold}&background=%23${background}&color=%23${color}&size=${size}`;
  }

  isCurrentUser(senderId: string): boolean {
    return senderId === this.senderId;
  }
  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}
