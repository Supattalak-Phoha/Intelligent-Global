import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss', './../../styles.scss']
})

export class ContactUsComponent {
  data: any = {};
  contents: any = {}
  images: any = {}
  arrays: any = {}

  constructor(
    private dataService: DataService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.dataService.getDataForContactUsPage().subscribe(
      (response: any) => {
        this.data = response;
        this.contents = this.data?.contents
        this.images = this.data?.images
        this.arrays = this.data?.arrays

        this.arrays.array001?.forEach((element: any) => {
          element.description = this.sanitizer.bypassSecurityTrustHtml(element.description);
        });
      },
      (error: any) => {
        console.error('Error fetching data', error);
      }
    );
  }

  openMap() {
    window.open(this.contents.content003, '_blank', 'noopener,noreferrer');
  }
}
