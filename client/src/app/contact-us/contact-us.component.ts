import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss', './../../styles.scss']
})

export class ContactUsComponent {
  contents = {
    content001: "ติดต่อเรา",
    content002: "บริษัท อินเทลลิเจนท์ โกลบอล จำกัด",
    content003: "https://www.google.co.th/maps/search/INTELLIGENT+GLOBAL+CO.,+LTD./@13.8149871,100.5617152,14z/data=!3m1!4b1?entry=ttu"
  }

  images = {
    image001: "assets/images/contact-us/contact-us-001.jpg",
    image002: "assets/images/contact-us/contact-us-002.jpg",
    image003: "assets/images/contact-us/contact-us-003.png"
  }

  arrays = {
    array001: [
      {
        name: "ที่อยู่",
        description: "บริษัท อินเทลลิเจ้นท์ โกลบอล จำกัด เลขที่ 909/275 ซอย25 ถนนรังสิต-นครนายก ตำบลประชาธิปัตย์ อำเภอธัญบุรี จ.ปทุมธานี 12130",
        class: "fas fa-solid fa-house fa-stack-1x fa-inverse",
        image001: "assets/images/home/home-004.png"
      },
      {
        name: "ติดต่อ",
        description: "เบอร์โทร : 065-359-3544<br>Email : support&#64;intelligentglobal.com",
        class: "fas fa-solid fa-phone fa-stack-1x fa-inverse",
        image001: "assets/images/home/home-005.png"
      },
      {
        name: "เวลาทำการ",
        description: "วันจันทร์ – วันศุกร์: 8am to 6pm<br>Saturday: 9am to 5pm",
        class: "fas fa-solid fa-door-open fa-stack-1x fa-inverse",
        image001: "assets/images/home/home-006.png"
      }
    ]
  }

  openMap() {
    window.open(this.contents.content003, '_blank', 'noopener,noreferrer');
  }
}
