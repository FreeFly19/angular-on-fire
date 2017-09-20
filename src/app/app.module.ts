import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ContactDetailComponent } from './contact/contact-detail/contact-detail.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { BoardComponent } from './board/board.component';
import { AuthComponent } from './auth/auth.component';
import { firebaseConfig } from '../firebase-config';

const routes: Routes = [
  { path: '', component: BoardComponent, pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ContactDetailComponent,
    ContactListComponent,
    AuthComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
