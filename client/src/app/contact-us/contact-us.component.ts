import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss', './../../styles.scss']
})

export class ContactUsComponent {
  images = {
    image001: "assets/images/contact-us-002.jpg",
    image002: "assets/images/map.png"
  }
}
