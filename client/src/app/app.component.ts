import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DataService } from './data.service';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../../public/assets/css/styles.scss'],
})
export class AppComponent {
  data: any = {};
  contents: any = {}
  images: any = {}
  arrays: any = {}

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
    private dataService: DataService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getData()
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

  getData() {
    this.dataService.getDataForAppPage().subscribe(
      (response: any) => {
        this.data = response;
        this.contents = this.data?.contents
        this.images = this.data?.images
        this.arrays = this.data?.arrays
        this.arrays.array001 = this.showAdminButton() ? this.arrays?.array001 : this.arrays?.array001?.filter?.((x: any) => x?.name !== 'การจัดการข้อมูล')
        this.arrays.array002?.forEach((element: any) => {
          element.name = '<li>' + element?.name + '</li>'
        });

        this.contents.content010 = this.sanitizer.bypassSecurityTrustHtml(this?.contents?.content010);
        this.contents.content011 = this.sanitizer.bypassSecurityTrustHtml(this?.contents?.content011);
        this.contents.content012 = this.sanitizer.bypassSecurityTrustHtml(this?.contents?.content012);
        this.contents.content013 = this.sanitizer.bypassSecurityTrustHtml(this?.contents?.content013);
        this.contents.content014 = this.sanitizer.bypassSecurityTrustHtml(this?.contents?.content014);
      },
      (error: any) => {
        console.error('Error fetching data', error);
      }
    );
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
    window.open(this.contents?.content001, '_blank', 'noopener,noreferrer');
  }

  login() {
    this.dataService.login({ username: this.username, password: this.password }).subscribe((response) => {
      if (response?.id && response?.username) {
        this.isLoginPage = false
        sessionStorage.setItem('isAdmin', 'true');
        sessionStorage.setItem('username', response?.username);
        this.router.navigate(['']);
      }
      else {
        this.isLoginPage = true
        this.loginError = "กรุณาตรวจสอบ Username และ Password อีกครั้ง"
        this.password = ""
        sessionStorage.clear();
      }
      this.getData()
    },
      (error: any) => {
        console.error('Error fetching data', error);
      }
    );

  }

  logout() {
    Swal.fire({
      text: "คุณต้องการออกจากระบบใช่หรือไม่?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่ ออกจากระบบ",
      cancelButtonText: "ยกเลิก"
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        this.router.navigate(['']).then(() => {
          this.getData()
          window.scrollTo(0, 0); // เลื่อนหน้าไปที่ด้านบนสุด
        });
      }
    });
  }

  showAdminButton() {
    const isAdmin = sessionStorage.getItem('isAdmin');
    return isAdmin?.toString().toLowerCase() === 'true';
  }

  goToDetail(element: any) {
    this.router.navigate(['/service-detail/' + element?.code],
      {
        state: { service: element }
      }).then(() => {
        window.scrollTo(0, 0); // เลื่อนหน้าไปที่ด้านบนสุด
      });
  }

}
