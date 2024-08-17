import { Component } from '@angular/core';
import { DataService } from '../data.service';

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

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getDataForContactUsPage().subscribe(
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

  openMap() {
    window.open(this.contents.content003, '_blank', 'noopener,noreferrer');
  }
}
