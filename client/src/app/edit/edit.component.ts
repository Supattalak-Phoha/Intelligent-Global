import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss', '../../../public/assets/css/styles.scss'],
})
export class EditComponent implements OnInit, OnDestroy {
  data: any = {};
  contents: any = {}
  images: any = {}
  arrays: any = {}
  tab: string = ''
  editors: any[] = [];
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(private router: Router,
    private dataService: DataService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.tab = 'services'
    this.getDataForServicePage()
  }

  ngOnDestroy(): void {
    this.editors.forEach(editor => editor.destroy());
  }

  getData(event: any) {
    if (event.tab.textLabel === 'หน้าหลัก') {
      this.tab = 'home'
      this.getDataForHomePage()
    } else if (event.tab.textLabel === 'เกี่ยวกับเรา') {
      this.tab = 'about-us'
      this.getDataForAboutUsPage()
    } else if (event.tab.textLabel === 'บริการ') {
      this.tab = 'services'
      this.getDataForServicePage()
    } else if (event.tab.textLabel === 'ติดต่อเรา') {
      this.tab = 'contact-us'
      this.getDataForContactUsPage()
    }
  }

  getDataForHomePage() {
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

  getDataForAboutUsPage() {
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

  getDataForServicePage() {
    this.dataService.getDataForServicePage().subscribe(
      (response: any) => {
        this.data = response;
        this.contents = this.data?.contents
        this.images = this.data?.images
        this.arrays = this.data?.arrays

        this.arrays?.array001?.forEach((element: any, index: number) => {
          this.editors.push(new Editor());
        });
      },
      (error: any) => {
        console.error('Error fetching data', error);
      }
    );
  }

  getDataForContactUsPage() {
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

  getDataFromObject() {
    return JSON.stringify(this.data)
  }

  updateData() {
    if (this.tab === 'home') {
      this.getDataForHomePage()
    } else if (this.tab === 'about-us') {
      this.getDataForAboutUsPage()
    } else if (this.tab === 'services') {
      this.dataService.updateDataForServicePage(this?.data).subscribe(() => {
        this.getDataForServicePage()
      });
    } else if (this.tab === 'contact-us') {
      this.getDataForContactUsPage()
    }
  }
}
