import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

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
  
  constructor(private dataService: DataService, private router: Router) {
  }

  ngOnInit() {
    this.dataService.getDataForHomePage().subscribe(
      (response: any) => {
        this.data = response;
        this.contents = this.data?.contents
        this.images = this.data?.images
        this.arrays = this.data?.arrays
      },
      (error: any) => {
        console.error('Error fetching data', error);
      }
    );
  }

  goToDetail(code: any) {
    this.router.navigate(['/service-detail/' + code]).then(() => {
      window.scrollTo(0, 0); // เลื่อนหน้าไปที่ด้านบนสุด
    });
  }
}
