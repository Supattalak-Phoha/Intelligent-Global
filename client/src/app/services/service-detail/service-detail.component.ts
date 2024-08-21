import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.scss'
})
export class ServiceDetailComponent {
  code: any = "";
  data: any = {};
  contents: any = {}
  images: any = {}
  arrays: any = {}
  navigation: any = {}
  navigation01: any = {}

  constructor(private route: ActivatedRoute, private router: Router) {
    this.navigation = this.router.getCurrentNavigation();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.code = params.get('code');

      this.navigation01 = this.router.getCurrentNavigation();
      if (this?.navigation01?.id) {
        this.data = this.navigation01?.extras?.state?.['service'];
      }
      else {
        this.data = this.navigation?.extras?.state?.['service'];
      }

      this.contents = {
        content001: this.data?.name,
        content002: this.data?.content
      }
      this.images = {
        image001: "assets/images/services/services-001.jpg"
      }
    });
  }
}
