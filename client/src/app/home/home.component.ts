import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../../public/assets/css/styles.scss']
})
export class HomeComponent {
  contents = {
    content001: "Welcome To Our Company",
    content002: "Intelligent Global Co, Ltd.",
    content003: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Intelligent Global Co, Ltd. บริการรับจดเครื่องหมายการค้า บริการขอใบอนุญาต มอก. สมอ. รับจด อย.อาหารและยา รับขึ้นทะเบียนนวัตกรรม จดสิทธิบัตร จดลิขสิทธิ์ จดแบรนด์ จดลิขสิทธิ์โลโก้ รับจ้างเป็นทนายและว่าความ แบบครบวงจร ที่มีประสบการณ์งานด้านทรัพย์สินทางปัญญามายาวนานมากกว่า 3 ปี เราก่อตั้งขึ้นโดยทีมงาน ซึ่งทำงานและมีประสบการณ์งานด้านทรัพย์สินทางปัญญา โดยเฉพาะอย่างยิ่งงานเขียนสิทธิบัตรซึ่งถือเป็นงานที่จะต้องใช้ประสบการณ์ และ ความสามารถเป็นอย่างมาก ในการเขียนให้ถูกต้องตามหลักสากล และ สามารถใช้บังคับได้ โดยเชื่อมั่นว่าจะสามารถทำให้คุณได้ความพึงพอใจสูงสุด "
  }

  images = {
    image001: "assets/images/home/home-002.jpg"
  }

  arrays = {
    array001: [
      {
        name: "รับจดเครื่องหมายการค้า",
        description: "รับจดเครื่องหมายการค้ารับจดเครื่องหมายการค้า",
        image001: "assets/images/home/home-002.jpg"
      },
      {
        name: "รับจดสิทธิบัตร อนุสิทธิบัตร",
        description: "รับจดเครื่องหมายการค้ารับจดเครื่องหมายการค้า",
        image001: "assets/images/home/home-002.jpg"
      },
      {
        name: "รับจดลิขสิทธิ์",
        description: "รับจดเครื่องหมายการค้ารับจดเครื่องหมายการค้า",
        image001: "assets/images/home/home-002.jpg"
      },
      {
        name: "รับจดสิทธิบัตรต่างประเทศ",
        description: "รับจดเครื่องหมายการค้ารับจดเครื่องหมายการค้า",
        image001: "assets/images/home/home-002.jpg"
      },
      {
        name: "รับขึ้นทะเบียนและจดบัญชีนวัตกรรมไทย",
        description: "รับจดเครื่องหมายการค้ารับจดเครื่องหมายการค้า",
        image001: "assets/images/home/home-002.jpg"
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
