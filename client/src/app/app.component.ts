import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../../public/assets/css/styles.scss'],
})
export class AppComponent {
  contents = {
    content001: "หน้าหลัก",
    content002: "เกี่ยวกับเรา",
    content003: "บริการ",
    content004: "ติดต่อเรา",
    content005: "จัดการข้อมูล",
    content006: "ติดต่อเรา",
    content007: "เวลาทำการ",
    content008: "บริการของเรา",
    content009: "ทนายความของเรา",
    content010: "บริษัท อินเทลลิเจ้นท์ โกลบอล จำกัด <br>909/275 ซอย25 ถนนรังสิต-นครนายก ตำบลประชาธิปัตย์ อำเภอธัญบุรี จ.ปทุมธานี 12130",
    content011: "เบอร์โทร : 065-359-3544",
    content012: "Email : support@intelligentglobal.com",
    content013: "Opening Day: <br>วันจันทร์ – วันศุกร์: 8am to 6pm <br>Saturday: 9am to 5pm <br><br>Vacation:All <br>Sunday DayAll <br>Vacation Holiday",
    content014: "2024 Intelligent Global Co, Ltd.<br>All rights reserved.",
    content000: "",
  }

  images = {
    image001: "assets/images/logo-01.png",
    image002: "assets/images/line-button.png"
  }

  arrays = {
    array001: [
      {
        name: "<li>อาหารและยา (อย.)</li>"
      },
      {
        name: "<li>มาตรฐานผลิตภัณฑ์อุตสาหกรรม (มอก.)</li>"
      },
      {
        name: "<li>บัญชีนวัตกรรมไทย</li>"
      },
      {
        name: "<li>เครื่องหมายการค้า ลิขสิทธิ์ และจดทะเบียนต่าง ๆ</li>"
      },
      {
        name: "<li>บาร์โค้ด</li>"
      },
      {
        name: "<li>ส่งเสริมการลงทุน (BOI)</li>"
      },
      {
        name: "<li>Accounting and Tax</li>"
      },
      {
        name: "<li>GMP HACCP</li>"
      },
      {
        name: "<li>รับรองฮาลาล (HALAL)</li>"
      },
      {
        name: "<li>VISA and Work permit</li>"
      },
      {
        name: "<li>ขอรับรอง Made in Thailand (MiT)</li>"
      },
      {
        name: "<li>ปรึกษากฏหมาย</li>"
      }
    ],
    array002: [
      {
        name: "<li>สุภัทธลักษณ์ โพธิ์หา</li>"
      },
      {
        name: "<li>ฐนธนินท์ พิมพ์ศิริ</li>"
      },
    ]
  }

  isLoginPage: boolean = false
  loginError: string = ""
  username: string = ""
  password: string = ""
  currentPage: any = ''
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(private router: Router,
    private dataService: DataService
  ) { }


  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        //#region Support Service Detail
        if ((event.urlAfterRedirects).indexOf("/service-detail") !== -1) {
          event.urlAfterRedirects = "/service-detail"
        }
        //#endregion Support Service Detail

        if (['/login'].includes(event.urlAfterRedirects)) {
          this.isLoginPage = true
        } else if (['/'].includes(event.urlAfterRedirects)) {
          this.currentPage = ""
        } else if (['/about-us'].includes(event.urlAfterRedirects)) {
          this.currentPage = "about-us"
        } else if (['/services', '/service-detail'].includes(event.urlAfterRedirects)) {
          this.currentPage = "services"
        } else if (['/contact-us'].includes(event.urlAfterRedirects)) {
          this.currentPage = "contact-us"
        } else if (['/edit'].includes(event.urlAfterRedirects)) {
          this.currentPage = "edit"
        } else {
          this.currentPage = ""
        }
      }
    });
  }

  showPage(page: string) {
    this.currentPage = page
    this.router.navigate(['/' + page]);
  }

  showButton = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const scrollPosition = window.scrollY;
    this.showButton = scrollPosition > 10; // Show button if scrolled more than 100px
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  addLINE() {
    window.open('https://line.me/ti/p/~i-coke', '_blank', 'noopener,noreferrer');
  }

  // login() {
  //   this.dataService.login(this.username, this.password).then(
  //     (response: any) => {
  //       if (response?.id && response?.username) {
  //         this.isLoginPage = false
  //         sessionStorage.setItem('isAdmin', 'true');
  //         sessionStorage.setItem('username', response?.username);
  //         this.router.navigate(['']);
  //       }
  //       else {
  //         this.isLoginPage = true
  //         this.loginError = "กรุณาตรวจสอบ Username และ Password อีกครั้ง"
  //         this.password = ""
  //         sessionStorage.clear();
  //       }
  //     },
  //     (error: any) => {
  //       console.error('Error fetching data', error);
  //     }
  //   );

  // }

  showEditButton() {
    const isAdmin = sessionStorage.getItem('isAdmin');
    return isAdmin?.toString().toLowerCase() === 'true';
  }

}
