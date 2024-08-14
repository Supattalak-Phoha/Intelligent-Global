import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../../public/assets/css/styles.scss']
})
export class HomeComponent {
  contents = {
    content001: "ยินดีต้อนรับเข้าสู่",
    content002: "Intelligent Global Co, Ltd.",
    content003: '"เรายินดีให้คำปรึกษาและการบริการ เพื่อสร้างภาพลักษณ์ที่น่าเชื่อถือ จนนำพาธุรกิจของคุณไปสู่เป้าหมายที่ตั้งไว้"',
    content004: "บริการของเรา",
    content005: "บริษัทของเรามีบริการต่าง ๆ มากมาย เพื่อตอบสนองความต้องการของคุณ"
  }

  images = {
    image001: "assets/images/home/home-002.jpg"
  }

  arrays = {
    array001: [
      {
        name: "อาหารและยา",
        description: "บริการให้คำปรึกษาเกี่ยวกับอาหารและยา (อย.)",
        class: "fas fa-solid fa-handshake fa-stack-1x fa-inverse",
        image001: "assets/images/home/home-004.png"
      },
      {
        name: "มาตรฐานผลิตภัณฑ์อุตสาหกรรม",
        description: "บริการให้คำปรึกษาเกี่ยวกับมาตรฐานผลิตภัณฑ์อุตสาหกรรม (มอก.)",
        class: "fas fa-solid fa-user-secret fa-stack-1x fa-inverse",
        image001: "assets/images/home/home-005.png"
      },
      {
        name: "ลิขสิทธิ์",
        description: "บริการรับจดแจ้งลิขสิทธิ์ ฯลฯ",
        class: "fas fa-solid fa-landmark fa-stack-1x fa-inverse",
        image001: "assets/images/home/home-006.png"
      }
    ],
    array002: [
      {
        name: "อาหารและยา (อย.)",
        description: "รอดำเนินการ...",
        image001: "assets/images/services/service-001.jpg"
      },
      {
        name: "มาตรฐานผลิตภัณฑ์อุตสาหกรรม (มอก.)",
        description: "รอดำเนินการ...",
        image001: "assets/images/services/service-002.jpg"
      },
      {
        name: "บัญชีนวัตกรรมไทย",
        description: "รอดำเนินการ...",
        image001: "assets/images/services/service-003.jpg"
      },
      {
        name: "เครื่องหมายการค้า ลิขสิทธิ์ และจดทะเบียนต่างๆ ",
        description: "รอดำเนินการ...",
        image001: "assets/images/services/service-004.jpg"
      },
      {
        name: "บาร์โค้ด",
        description: "รอดำเนินการ...",
        image001: "assets/images/services/service-005.jpg"
      },

      {
        name: "ส่งเสริมการลงทุน (BOI)",
        description: "รอดำเนินการ...",
        image001: "assets/images/services/service-006.jpg"
      },
      {
        name: "Accounting and Tax",
        description: "รอดำเนินการ...",
        image001: "assets/images/services/service-007.jpg"
      },
      {
        name: "GMP HACCP",
        description: "รอดำเนินการ...",
        image001: "assets/images/services/service-008.jpg"
      },
      {
        name: "รับรองฮาลาล (HALAL)",
        description: "รอดำเนินการ...",
        image001: "assets/images/services/service-009.jpg"
      },
      {
        name: "VISA and Work permit",
        description: "รอดำเนินการ...",
        image001: "assets/images/services/service-010.jpg"
      },
      {
        name: "ขอรับรอง Made in Thailand (MiT)",
        description: "รอดำเนินการ...",
        image001: "assets/images/services/service-011.jpg"
      },
      {
        name: "ปรึกษากฏหมาย",
        description: "รอดำเนินการ...",
        image001: "assets/images/services/service-012.jpg"
      }
    ]
  }


  data: any[] = [];
  isImageLoaded01 = false;
  isImageLoaded02 = false;


  constructor(private dataService: DataService) {
  }

  onImageLoad(picture: string) {
    if (picture === 'isImageLoaded01') {
      this.isImageLoaded01 = true;
    } else if (picture === 'isImageLoaded02') {
      this.isImageLoaded02 = true;
    }
  }

  ngOnInit() {
    // this.dataService.getData().subscribe(
    //   (response: any) => {
    //     this.data = response;
    //   },
    //   (error: any) => {
    //     console.error('Error fetching data', error);
    //   }
    // );
  }
}
