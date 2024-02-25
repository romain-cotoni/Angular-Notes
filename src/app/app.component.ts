import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'notes-write.ovh';

  constructor(private router: Router) {}

  showheader() {
    return this.router.url !== "/register" && 
           this.router.url !== "/login" && 
           this.router.url !== "/logout" &&
           this.router.url !== "/editor" &&
           this.router.url !== "/share-note" &&
           this.router.url !== "/dashboard"
  }

  showfooter() {
    return this.router.url !== "/register" && 
           this.router.url !== "/login" && 
           this.router.url !== "/logout" &&
           this.router.url !== "/editor" &&
           this.router.url !== "/share-note" &&
           this.router.url !== "/dashboard"
           //!this.router.url.startsWith("/note/");
  }

}
