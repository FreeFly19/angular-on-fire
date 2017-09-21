import { Component } from '@angular/core';
import {HodorBot} from "./hodor.bot";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HodorBot]
})
export class AppComponent {
  // Added in order to initialize HodorBot and pass to it required dependencies
  constructor(hodorBot: HodorBot) {
  }
}
