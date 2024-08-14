import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-services',
  templateUrl: './all-services.component.html',
  styleUrls: ['./all-services.component.scss', './../../../styles.scss']
})
export class AllServicesComponent {
  contents = {
    content001: "บริการของเรา",
    content002: "บริษัทของเรามีบริการต่าง ๆ มากมาย เพื่อตอบสนองความต้องการของคุณ"
  }

  images = {
    image001: "assets/images/services/services-001.jpg"
  }

  arrays = {
    array001: [
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
    ]
  }

  constructor(private router: Router
  ) { }

  goToDetail(code: any) {
    this.router.navigate(['/service-detail/' + code]).then(() => {
      window.scrollTo(0, 0); // เลื่อนหน้าไปที่ด้านบนสุด
    });
  }
}
