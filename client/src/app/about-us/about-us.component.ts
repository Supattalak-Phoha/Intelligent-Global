import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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

  constructor(
    private dataService: DataService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.dataService.getDataForAboutUsPage().subscribe(
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
}
