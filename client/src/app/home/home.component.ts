import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

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
    content005: "บริษัทของเรามีบริการต่าง ๆ มากมาย เพื่อตอบสนองความต้องการของคุณ",
    content006: "ทีมของเรา",
    content007: "ทีมงานของเรา เต็มเปี่ยมไปด้วยศักยภาพและประสบการณ์ต่าง ๆ มากมาย"
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
        image001: "assets/images/services/service-001.jpg",
        code: "FDA"
      },
      {
        name: "มาตรฐานผลิตภัณฑ์อุตสาหกรรม (มอก.)",
        description: "รอดำเนินการ...",
        image001: "assets/images/services/service-002.jpg",
        code: "TIS"
      },
      {
        name: "บัญชีนวัตกรรมไทย",
        description: "รอดำเนินการ...",
        image001: "assets/images/services/service-003.jpg",
        code: "NSTDA"
      },
      {
        name: "เครื่องหมายการค้า ลิขสิทธิ์ และจดทะเบียนต่าง ๆ",
        description: "รอดำเนินการ...",
        image001: "assets/images/services/service-004.jpg",
        code: "TM"
      },
      {
        name: "บาร์โค้ด",
        description: "รอดำเนินการ...",
        image001: "assets/images/services/service-005.jpg",
        code: "BC"
      },

      {
        name: "ส่งเสริมการลงทุน (BOI)",
        description: "รอดำเนินการ...",
        image001: "assets/images/services/service-006.jpg",
        code: "BOI"
      },
      {
        name: "Accounting and Tax",
        description: "รอดำเนินการ...",
        image001: "assets/images/services/service-007.jpg",
        code: "AT"
      },
      {
        name: "GMP HACCP",
        description: "รอดำเนินการ...",
        image001: "assets/images/services/service-008.jpg",
        code: "GH"
      },
      {
        name: "รับรองฮาลาล (HALAL)",
        description: "รอดำเนินการ...",
        image001: "assets/images/services/service-009.jpg",
        code: "HALAL"
      },
      {
        name: "VISA and Work permit",
        description: "รอดำเนินการ...",
        image001: "assets/images/services/service-010.jpg",
        code: "VISA"
      },
      {
        name: "ขอรับรอง Made in Thailand (MiT)",
        description: "รอดำเนินการ...",
        image001: "assets/images/services/service-011.jpg",
        code: "MIT"
      },
      {
        name: "ปรึกษากฏหมาย",
        description: "รอดำเนินการ...",
        image001: "assets/images/services/service-012.jpg",
        code: "LAW"
      }
    ],
    array003: [
      {
        name: "Qualified Lawyer",
        count: 2978,
        class: "fas fa-solid fa-gavel fa-stack-1x fa-inverse home-custom-css-008"
      },
      {
        name: "Trusted Clients",
        count: 8956,
        class: "fas fa-solid fa-user fa-stack-1x fa-inverse home-custom-css-008"
      },
      {
        name: "Successful Case",
        count: 1540,
        class: "fas fa-solid fa-thumbs-up fa-stack-1x fa-inverse home-custom-css-008"
      },
      {
        name: "Honors & Award",
        count: 2431,
        class: "fas fa-solid fa-award fa-stack-1x fa-inverse home-custom-css-008"
      }
    ],
    array004: [
      {
        name: "สุภัทธลักษณ์ โพธิ์หา",
        description: "การศึกษา : (บช.บ.) เชี่ยวชาญงานยื่นเอกสาร ติดต่อราชการ งานด้านทะเบียนเอกสารสิทธิบัตร เครื่องหมายการค้า ลิขสิทธิ์",
        image: "assets/images/home/home-004.png"
      },
      {
        name: "สุภัทธลักษณ์ โพธิ์หา",
        description: "การศึกษา : (บช.บ.) เชี่ยวชาญงานยื่นเอกสาร ติดต่อราชการ งานด้านทะเบียนเอกสารสิทธิบัตร เครื่องหมายการค้า ลิขสิทธิ์",
        image: "assets/images/home/home-004.png"
      },
      {
        name: "สุภัทธลักษณ์ โพธิ์หา",
        description: "การศึกษา : (บช.บ.) เชี่ยวชาญงานยื่นเอกสาร ติดต่อราชการ งานด้านทะเบียนเอกสารสิทธิบัตร เครื่องหมายการค้า ลิขสิทธิ์",
        image: "assets/images/home/home-004.png"
      },
      {
        name: "สุภัทธลักษณ์ โพธิ์หา",
        description: "การศึกษา : (บช.บ.) เชี่ยวชาญงานยื่นเอกสาร ติดต่อราชการ งานด้านทะเบียนเอกสารสิทธิบัตร เครื่องหมายการค้า ลิขสิทธิ์",
        image: "assets/images/home/home-004.png"
      }
    ]
  }


  data: any[] = [];
  isImageLoaded01 = false;
  isImageLoaded02 = false;


  constructor(private dataService: DataService, private router: Router) {
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

  goToDetail(code: any) {
    this.router.navigate(['/service-detail/' + code]).then(() => {
      window.scrollTo(0, 0); // เลื่อนหน้าไปที่ด้านบนสุด
    });
  }
}
