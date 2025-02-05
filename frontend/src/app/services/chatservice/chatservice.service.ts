import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import { ChatMessageDTO } from '../../model/messageDTO';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Message } from 'src/app/interfaces/message';
@Injectable({
  providedIn: 'root',
})
export class ChatserviceService {
  private socket: Socket;
  constructor(    
    
    private http: HttpClient,
  ) {
    this.socket = io('http://localhost:3000/');
  }
  private roomIdSource = new BehaviorSubject<string | null>(null);
  currentRoomId = this.roomIdSource.asObservable();

  

  setRoomId(roomId: string) {
    this.roomIdSource.next(roomId);
  }

  clearRoomId() {
    this.roomIdSource.next(null);
  }


  joinRoom(senderId: string, receiverId: string): string {
    const roomName = this.getRoomName(senderId, receiverId);
    this.socket.emit('joinRoom', { senderId, receiverId });
    return roomName
  }
  sendMessage(senderId: string, receiverId: string,content: string){
    return this.socket.emit("sendMessage",{senderId,receiverId,content})
  }
  receiveMessage(callback: (message: { senderId: string; receiverId: string; content: string }) => void) {
    this.socket.on('newMessage', (data: { senderId: string; receiverId: string; content: string }) => {
      callback(data);
    });
  }
  private getRoomName(senderId: string, receiverId: string): string {
    return [senderId, receiverId].sort().join('_');
  }
  public  getConversation(senderId: string,recieverId : string): Observable<Message[]>{
    return  this.http.get<Message[]>(`${environment.BASE_URL}/messages/conversation/${senderId}/${recieverId}`)
  }
}
