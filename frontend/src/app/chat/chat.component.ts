import { Component ,OnInit,OnDestroy, ElementRef, ViewChild, Input} from '@angular/core';
import { ChatserviceService } from '../services/chatservice/chatservice.service';
import { Subscription } from 'rxjs';
import { ChatMessageDTO } from '../model/messageDTO';
import { DatePipe } from '@angular/common';
import { UserService } from '../services/Userservice/user.service';
import { SessionService } from '../services/sessionManager/session.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent  implements   OnInit, OnDestroy {
  @Input() senderId : string="5";
  @Input() recipientId : string="6";   
  messages: any[] = []; 
  content: string = "" ; 
  sender: any ;
  recipient:any;
  roomId: string="";
  constructor(
    private chatserviceService : ChatserviceService,
    private datePipe: DatePipe,
    private userService : UserService,
    private session: SessionService,
  ) {}

  ngOnInit(): void {
    this.userService.getUserById(this.senderId).subscribe((sender)=>{
      this.sender=sender
    })
    this.userService.getUserById(this.recipientId).subscribe((recipient)=>{
      this.recipient=recipient
    })
    this.updateTimeAgo()
    console.log("test");
    this.joinRoom()
  }
   joinRoom(){
    this.roomId =  this.chatserviceService.joinRoom(this.sender.id,this.recipient.id);
    this.chatserviceService.receiveMessage((data) => {
      const currentTime = new Date();
      currentTime.setHours(currentTime.getHours() + 1);
      const isoTimeString = currentTime.toISOString();
      const formattedTimestamp = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');

      const message = {
          sender: this.sender,
          recipient: this.recipient,
          content: data.content,
          chatId: this.roomId,
          timestamp: isoTimeString }

      this.messages.push(data);
    });
  }
  sendMessage(): void {
    console.log(this.chatserviceService.sendMessage(this.sender.id,this.recipient.id,this.content))
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
  isCurrentUser(senderId: string): boolean {
    return senderId === this.session.getUserDetails()?.id;
  }
  ngOnDestroy(): void {

  }
}
