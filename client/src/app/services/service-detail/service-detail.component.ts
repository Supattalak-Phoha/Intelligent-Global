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

  constructor(private route: ActivatedRoute, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.data = navigation?.extras?.state?.['service'];
    console.log(this.data)
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.code = params.get('code');
      this.contents = {
        content001: this.data?.name,
        content002: this.data?.content
      }
    });
  }
}
