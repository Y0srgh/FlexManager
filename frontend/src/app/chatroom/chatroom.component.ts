import { Component ,OnInit,OnDestroy, ElementRef, ViewChild, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatserviceService } from '../services/chatservice/chatservice.service';
import { Subscription } from 'rxjs';
import { ChatMessageDTO } from '../model/messageDTO';
import { DatePipe } from '@angular/common';
import { UserService } from '../services/Userservice/user.service';
import { SessionService } from '../services/sessionManager/session.service';
@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.css',


})

export class ChatroomComponent  implements   OnInit, OnDestroy {
  @Input() senderId : string="0";
  @Input() recipientId : string="1";   
  currentUserId = "0";  
  contacts : any[]=[{ id: "0", username: 'sendersssssss1@example.com' },{ id: "1", username: 'sender2@example.com' }]
  messages = [
    {
      sender: { id: "0", username: 'sender1@example.com' },
      content: 'Hello!',
      timestamp: new Date()
    },
    {
      sender: { id: "1", username: 'sender2@example.com' },
      content: 'Hi!',
      timestamp: new Date()
    },   {
      sender: { id: "0", username: 'sender1@example.com' },
      content: 'ssss!',
      timestamp: new Date()
    },{
      sender: { id: "0", username: 'sender1@example.com' },
      content: 'ssss!',
      timestamp: new Date()
    },
    {
      sender: { id: "0", username: 'sendesssssr1@example.com' },
      content: 'ssss!',
      timestamp: new Date()
    },
  ];
  content: string = "" ; 
  sender: any ;
  recipient:any={username:"sender1@example.com",id:"0"};
  roomId: string="";
  constructor(
    // private chatserviceService : ChatserviceService,
    // private datePipe: DatePipe,
    // private userService : UserService,
    // private session: SessionService,
  ) {}

  ngOnInit(): void {
    // this.userService.getUserById(this.senderId).subscribe((sender)=>{
    //   this.sender=sender
    // })
    // this.userService.getUserById(this.recipientId).subscribe((recipient)=>{
    //   this.recipient=recipient
    // })
    this.updateTimeAgo()
    // console.log("test");
    // this.joinRoom()
  }
   joinRoom(){
    // this.roomId =  this.chatserviceService.joinRoom(this.sender.id,this.recipient.id);
    // this.chatserviceService.receiveMessage((data) => {
    //   const currentTime = new Date();
    //   currentTime.setHours(currentTime.getHours() + 1);
    //   const isoTimeString = currentTime.toISOString();
    //   const formattedTimestamp = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');

    //   const message = {
    //       sender: this.sender,
    //       recipient: this.recipient,
    //       content: data.content,
    //       chatId: this.roomId,
    //       timestamp: isoTimeString }

    //   this.messages.push(data);
    // });
  }
  sendMessage(): void {
    // console.log(this.chatserviceService.sendMessage(this.sender.id,this.recipient.id,this.content))
  }

  selectContact(id: string){
    this.recipientId=id;
    //this.userService.getUserById(this.recipientId).subscribe((recipient)=>{
    //   this.recipient=recipient
    // })
  }
  updateTimeAgo(): void {
    setInterval(() => {
    }, 10000);
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
  isCurrentUser(userid : string ) : boolean{
    return userid=="0"
  }
  // isCurrentUser(senderId: string): boolean {
  //   return senderId === this.session.getUserDetails()?.id;
  // }
  ngOnDestroy(): void {

  }
}