import { Component } from '@angular/core';
import { SocketService } from './socket.service';
import { Observable } from 'rxjs';
import { CesarService } from './cesar.service';
import {FormData}from './form/data.model';
import { CyptoJsService } from './crypto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messageList:  string[] = [];
  obs: Observable<any>;
  c: string="10";
  message: string;
  constructor(private socketService: SocketService, private cesarService:CesarService, private cryptoService:CyptoJsService) {
  }
  chiave(loco: HTMLInputElement){
    this.c=(loco.value)
  }

  sendMessage(formData: FormData) {
    console.log("form input: " + JSON.stringify(formData));

    let encoded: FormData = formData; //Preparo una variabile da criptare
    switch (formData.messageType) {
      //Se il tipo di messaggio è cesar allora cripto con cesarService
      case "cesar":
        encoded.message = this.cesarService.encode(formData.message, Number(this.c));
        break;
      //Se il tipo di messaggio è t-des allora cripto con cryptoService.encodeDes
      case "t-des":
        encoded.message = this.cryptoService.encodeDes(formData.message, this.c);
        break;
    }
    //Invio il messaggio cifrato
    this.socketService.sendMessage(JSON.stringify(encoded));

    this.message = "";
  }
  ngOnInit() {
    this.obs = this.socketService.getMessage();
    this.obs.subscribe(this.decodeData);
  }

  decodeData = (messageData: string) => {
    let received: FormData = JSON.parse(messageData);
    console.log("messagereceived: " + JSON.stringify(received))

    switch (received.messageType) {
      case "cesar":
        received.message = this.cesarService.decode(received.message, Number(this.c));
        break;

      case "t-des":
        received.message = this.cryptoService.decodeDes(received.message, this.c);
        break;
    }

    this.messageList.push("messaggio cifrato: " + messageData + " messaggio decifrato " + JSON.stringify(received));

  }
  /*ngOnInit() {
    this.obs = this.socketService.getMessage();
    this.obs.subscribe(this.rcvMessage);
}
  rcvMessage = (messageData: string) => {
    let received: FormData = JSON.parse(messageData);
    console.log(received);
    console.log(received.message);
    this.messageList.push("messagereceived: " + received.message + " messaggio decriptato:" + this.cesarService.decode(received.message, Number(this.c)));
    console.log("messagereceived: " + received.message);
  }*/
}
