import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from "angularfire2/auth";
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ContactDetailComponent } from './contact/contact-detail/contact-detail.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { BoardComponent } from './board/board.component';
import { AuthComponent } from './auth/auth.component';
import { UserService } from "./user.service";
import { ContactService } from "./contact/contact.service";
import { MessageService } from "./messages/message.service";
import { ChatComponent } from './messages/chat/chat.component';
import { MessageComponent } from "./messages/message/message.component";
import { WelcomeComponent } from "./board/welcome.component";
import { firebaseConfig } from '../firebase-config';

const routes: Routes = [
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  {
    path: 'contacts',
    component: BoardComponent,
    children: [
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: 'welcome', component: WelcomeComponent },
      { path: ':id', component: ChatComponent },
      { path: ':id/edit', component: ContactDetailComponent }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ContactDetailComponent,
    ContactListComponent,
    AuthComponent,
    BoardComponent,
    ChatComponent,
    MessageComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  providers: [
    UserService,
    ContactService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
