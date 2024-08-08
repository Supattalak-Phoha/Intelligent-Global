import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../../public/assets/css/styles.scss']
})
export class HomeComponent {
  content = {
    text01: " บริการรับจดเค",
    text02: "บริการรับจดเครื่องหมายการค้า บริการขอใบ "
  }
  data: any[] = [];
  isImageLoaded01 = false;
  isImageLoaded02 = false;


  constructor(private dataService: DataService) {
   }

  onImageLoad(picture: string) {
    if (picture === 'isImageLoaded01') {
      this.isImageLoaded01 = true;
    } else if (picture === 'isImageLoaded02') {
      this.isImageLoaded02 = true;
    }
  }

  ngOnInit() {
    // this.dataService.getData().subscribe(
    //   (response: any) => {
    //     this.data = response;
    //   },
    //   (error: any) => {
    //     console.error('Error fetching data', error);
    //   }
    // );
  }
}
