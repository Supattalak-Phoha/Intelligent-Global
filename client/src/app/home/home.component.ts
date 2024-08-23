import { Component, ElementRef, HostListener } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../../public/assets/css/styles.scss']
})
export class HomeComponent {
  data: any = {};
  contents: any = {}
  images: any = {}
  arrays: any = {}

  constructor(
    private dataService: DataService,
    private router: Router,
    private el: ElementRef,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    this.dataService.getDataForHomePage().subscribe(
      (response: any) => {
        this.data = response;
        this.contents = this.data?.contents
        this.images = this.data?.images
        this.arrays = this.data?.arrays
        this.contents.content003 = this.sanitizer.bypassSecurityTrustHtml(this.contents.content003);
      },
      (error: any) => {
        console.error('Error fetching data', error);
      }
    );
  }

  goToDetail(element: any) {
    // this.router.navigate(['/service-detail/' + element?.code],
    //   {
    //     state: { service: element }
    //   }).then(() => {
    //     window.scrollTo(0, 0); // เลื่อนหน้าไปที่ด้านบนสุด
    //   });

    window.open('/service-detail/' + element?.code, '_blank');
  }

  getAllService() {
    let allService = this?.arrays?.array002?.filter?.((x: any) => x.enabled)
    return allService
  }
}
