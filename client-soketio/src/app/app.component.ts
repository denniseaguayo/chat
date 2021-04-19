import { Component } from '@angular/core';
import { SocketService } from './socket.service';
import { Observable } from 'rxjs';
import { CesarService } from './cesar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messageList:  string[] = [];
  obs: Observable<any>;

  constructor(private socketService: SocketService, private cesarService:CesarService) {
  }

  sendMessage(message: HTMLInputElement) {
    let encoded = this.cesarService.encode(message.value, 10);
    this.socketService.sendMessage(encoded);
    console.log("sent: " + message.value)
    message.value="";
  }
  ngOnInit() {
    this.obs = this.socketService.getMessage();
    this.obs.subscribe(this.rcvMessage);
}
  rcvMessage = (message: string) => {
    this.messageList.push(message);
    console.log("messagereceived: " + message)
  }

}

