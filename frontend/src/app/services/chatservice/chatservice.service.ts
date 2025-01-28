import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import { ChatMessageDTO } from '../../model/messageDTO';
@Injectable({
  providedIn: 'root',
})
export class ChatserviceService {

  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000/'); // Replace with your server URL
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

}
