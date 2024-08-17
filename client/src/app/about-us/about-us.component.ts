import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss', './../../styles.scss']
})
export class AboutUsComponent {
  data: any = {};
  contents: any = {}
  images: any = {}
  arrays: any = {}

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getDataForAboutUsPage().subscribe(
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
}
