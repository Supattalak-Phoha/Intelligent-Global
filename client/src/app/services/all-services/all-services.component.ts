import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-all-services',
  templateUrl: './all-services.component.html',
  styleUrls: ['./all-services.component.scss', './../../../styles.scss']
})
export class AllServicesComponent {
  data: any = {};
  contents: any = {}
  images: any = {}
  arrays: any = {}

  constructor(
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getDataForServicePage().subscribe(
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
    let allService = this?.arrays?.array001?.filter?.((x: any) => x.enabled)
    return allService
  }
}
