import { Component } from '@angular/core';

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

  arrays = {
    array001: [
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
        name: "เครื่องหมายการค้า ลิขสิทธิ์ และจดทะเบียนต่าง ๆ",
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
}
