import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { SessionStorageService } from '../../../services/session-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  user!: User | null;

  constructor(private router: Router,
              private userService: UserService,
              private sessionStorageService: SessionStorageService) {}

  ngOnInit() {
    //Get the user authenticated
    this.user = this.userService.getCurrentUser() || this.sessionStorageService.getUser();

    //Print log of user details 
    this.userService.getCurrentUser() ? console.log("\nFrom Header -> user from userService           : ", this.userService.getCurrentUser())
                                      : console.log("\nFrom Header -> user from sessionStorageService : ", this.sessionStorageService.getUser());
  }

  onAvatarClick() {}

}
