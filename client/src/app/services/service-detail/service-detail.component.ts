import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.scss'
})
export class ServiceDetailComponent {
  code: any = "";
  data: any = {};
  images: any = {}

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.code = params.get('code');
      this.dataService.getDataForServiceDetailPage(this.code).subscribe(
        (response: any) => {
          this.data = response?.service;
          this.images = response?.images;
        },
        (error: any) => {
          console.error('Error fetching data', error);
        }
      );
    });
  }
}
