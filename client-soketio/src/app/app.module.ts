import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SocketService } from './socket.service';
import { CesarService } from './cesar.service';

const config: SocketIoConfig = { url: 'https://3000-amethyst-rook-g7j1zahl.ws-eu03.gitpod.io/', options: {} };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [SocketService, CesarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
