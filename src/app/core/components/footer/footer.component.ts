import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  GITHUB_ICON   = "assets/icons/github.png";
  LINKEDIN_ICON = "assets/icons/linkedin.png";
  
  @Input() message!: string;
  
}
