import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss', '../../../public/assets/css/styles.scss'],
})
export class EditComponent implements OnInit, OnDestroy {
  tab: string = ''

  dataAboutUs: any = {};
  contentsAboutUs: any = {}
  imagesAboutUs: any = {}
  arraysAboutUs: any = {}
  editorsAboutUs: any[] = [];

  dataServices: any = {};
  contentsServices: any = {}
  imagesServices: any = {}
  arraysServices: any = {}
  editorsServices: any[] = [];

  dataContactUs: any = {};
  contentsContactUs: any = {}
  imagesContactUs: any = {}
  arraysContactUs: any = {}
  editorsContactUs: any[] = [];

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
    this.editorsAboutUs.forEach(editor => editor.destroy());
    this.editorsServices.forEach(editor => editor.destroy());
    this.editorsContactUs.forEach(editor => editor.destroy());
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
        // this.data = response;
        // this.contents = this.data?.contents
        // this.images = this.data?.images
        // this.arrays = this.data?.arrays
      },
      (error: any) => {
        console.error('Error fetching data', error);
      }
    );
  }

  getDataForAboutUsPage() {
    this.dataAboutUs = {};
    this.contentsAboutUs = {}
    this.imagesAboutUs = {}
    this.arraysAboutUs = {}
    this.editorsAboutUs = [];
    this.dataService.getDataForAboutUsPage().subscribe(
      (response: any) => {
        this.dataAboutUs = response;
        this.contentsAboutUs = this.dataAboutUs?.contents
        this.imagesAboutUs = this.dataAboutUs?.images
        this.arraysAboutUs = this.dataAboutUs?.arrays

        this.editorsAboutUs = [];
        [{ key: 'content003' }]?.forEach((element: any, index: number) => {
          this.editorsAboutUs.push(new Editor());
        });
      },
      (error: any) => {
        console.error('Error fetching data', error);
      }
    );
  }

  getDataForServicePage() {
    this.dataServices = {};
    this.contentsServices = {}
    this.imagesServices = {}
    this.arraysServices = {}
    this.editorsServices = [];
    this.dataService.getDataForServicePage().subscribe(
      (response: any) => {
        this.dataServices = response;
        this.contentsServices = this.dataServices?.contents
        this.imagesServices = this.dataServices?.images
        this.arraysServices = this.dataServices?.arrays

        this.editorsServices = [];
        this.arraysServices?.array001?.forEach((element: any, index: number) => {
          this.editorsServices.push(new Editor());
        });
      },
      (error: any) => {
        console.error('Error fetching data', error);
      }
    );
  }

  getDataForContactUsPage() {
    this.dataContactUs = {};
    this.contentsContactUs = {}
    this.imagesContactUs = {}
    this.arraysContactUs = {}
    this.editorsContactUs = [];
    this.dataService.getDataForContactUsPage().subscribe(
      (response: any) => {
        this.dataContactUs = response;
        this.contentsContactUs = this.dataContactUs?.contents
        this.imagesContactUs = this.dataContactUs?.images
        this.arraysContactUs = this.dataContactUs?.arrays

        this.arraysContactUs?.array001?.forEach((element: any, index: number) => {
          this.editorsContactUs.push(new Editor());
        });
      },
      (error: any) => {
        console.error('Error fetching data', error);
      }
    );
  }

  updateData() {
    if (this.tab === 'home') {
      this.getDataForHomePage()
    } else if (this.tab === 'about-us') {
      Swal.fire({
        text: "คุณต้องการบันทึกข้อมูลใช่หรือไม่?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่ บันทึกข้อมูล",
        cancelButtonText: "ยกเลิก"
      }).then((result) => {
        if (result.isConfirmed) {
          this.dataService.updateDataForAboutUsPage(this?.dataAboutUs).subscribe((response) => {
            Swal.fire({
              title: "Success",
              text: "แก้ไขข้อมูลเรียบร้อย",
              icon: "success"
            });
            this.getDataForAboutUsPage()
          },
            (error) => {
              console.error('Error:', error);
              Swal.fire({
                title: "Error",
                text: error?.message,
                icon: 'error'
              });
            });
        }
      });
    } else if (this.tab === 'services') {
      Swal.fire({
        text: "คุณต้องการบันทึกข้อมูลใช่หรือไม่?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่ บันทึกข้อมูล",
        cancelButtonText: "ยกเลิก"
      }).then((result) => {
        if (result.isConfirmed) {
          this.dataService.updateDataForServicePage(this?.dataServices).subscribe((response) => {
            Swal.fire({
              title: "Success",
              text: "แก้ไขข้อมูลเรียบร้อย",
              icon: "success"
            });
            this.getDataForServicePage()
          },
            (error) => {
              console.error('Error:', error);
              Swal.fire({
                title: "Error",
                text: error?.message,
                icon: 'error'
              });
            });
        }
      });
    } else if (this.tab === 'contact-us') {
      Swal.fire({
        text: "คุณต้องการบันทึกข้อมูลใช่หรือไม่?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่ บันทึกข้อมูล",
        cancelButtonText: "ยกเลิก"
      }).then((result) => {
        if (result.isConfirmed) {
          this.dataService.updateDataForContactUsPage(this?.dataContactUs).subscribe((response) => {
            Swal.fire({
              title: "Success",
              text: "แก้ไขข้อมูลเรียบร้อย",
              icon: "success"
            });
            this.getDataForContactUsPage()
          },
            (error) => {
              console.error('Error:', error);
              Swal.fire({
                title: "Error",
                text: error?.message,
                icon: 'error'
              });
            });
        }
      });
    }
  }
}
