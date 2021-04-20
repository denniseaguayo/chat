import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SocketService } from './socket.service';
import { CesarService } from './cesar.service';
import { CyptoJsService } from './crypto.service';

const config: SocketIoConfig = { url: 'https://3000-tan-ape-czadq6gv.ws-eu03.gitpod.io/', options: {} };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    FormsModule
  ],
  providers: [SocketService, CesarService, CyptoJsService],

  bootstrap: [AppComponent]
})
export class AppModule { }
