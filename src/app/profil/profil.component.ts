import { Component } from '@angular/core';
import { SubscribeFromAdminRequest, UserShared } from '../models/model-tests';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent {
  subscribe: SubscribeFromAdminRequest = {}
  user: UserShared = {}
  
  ngOnInit() {
    this.user
  }
}
