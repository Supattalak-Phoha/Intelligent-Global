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
    content003: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;การพัฒนาด้านคุณธรรม จะต้องเป็นตัวอย่างที่ดีของผู้ใต้บังคับบัญชา ยึดมั่นในความถูกต้องดีงาม. ประพฤติตนเป็นตัวอย่างแก่สังคมด้วยความซื่อสัตย์ จริงใจ ขยัน อดทน เที่ยงตรงและเสียสละ."
  }

  images = {
    image001: "assets/images/home/home-002.jpg",
    image002: "assets/images/home/home-004.png",
    image003: "assets/images/home-005.jpg"
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
