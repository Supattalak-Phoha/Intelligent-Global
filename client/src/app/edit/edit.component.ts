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

  dataHome: any = {};
  contentsHome: any = {}
  imagesHome: any = {}
  arraysHome: any = {}
  editorsHome: any[] = [];

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

  dataOthers: any = {};
  contentsOthers: any = {}
  imagesOthers: any = {}
  arraysOthers: any = {}
  editorsOthers010: any[] = [];
  editorsOthers011: any[] = [];
  editorsOthers012: any[] = [];
  editorsOthers013: any[] = [];
  editorsOthers014: any[] = [];

  dataTeamUs: any[] = [];

  dataImages: any = {};

  selectedFile: File | null = null;

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
    this.tab = 'home'
    this.getDataForHomePage()
  }

  ngOnDestroy(): void {
    this.editorsHome.forEach(editor => editor.destroy());
    this.editorsAboutUs.forEach(editor => editor.destroy());
    this.editorsServices.forEach(editor => editor.destroy());
    this.editorsContactUs.forEach(editor => editor.destroy());
    this.editorsOthers010.forEach(editor => editor.destroy());
    this.editorsOthers011.forEach(editor => editor.destroy());
    this.editorsOthers012.forEach(editor => editor.destroy());
    this.editorsOthers013.forEach(editor => editor.destroy());
    this.editorsOthers014.forEach(editor => editor.destroy());
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
    } else if (event.tab.textLabel === 'อื่นๆ') {
      this.tab = 'others'
      this.getDataForOthersPage()
    } else if (event.tab.textLabel === 'ทีมของเรา') {
      this.tab = 'team-us'
      this.getDataForTeamUsPage()
    } else if (event.tab.textLabel === 'รูปภาพ') {
      this.tab = 'images'
      this.getDataForImagesPage()
    }
  }

  getDataForHomePage() {
    this.dataHome = {};
    this.contentsHome = {}
    this.imagesHome = {}
    this.arraysHome = {}
    this.editorsHome = [];
    this.dataService.getDataForHomePage().subscribe(
      (response: any) => {
        this.dataHome = response;
        this.contentsHome = this.dataHome?.contents
        this.imagesHome = this.dataHome?.images
        this.arraysHome = this.dataHome?.arrays

        this.editorsHome = [];
        [{ key: 'content003' }]?.forEach((element: any, index: number) => {
          this.editorsHome.push(new Editor());
        });
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

  getDataForOthersPage() {
    this.dataOthers = {};
    this.contentsOthers = {}
    this.imagesOthers = {}
    this.arraysOthers = {}
    this.editorsOthers010 = [];
    this.editorsOthers011 = [];
    this.editorsOthers012 = [];
    this.editorsOthers013 = [];
    this.editorsOthers014 = [];
    this.dataService.getDataForAppPage().subscribe(
      (response: any) => {
        this.dataOthers = response;
        this.contentsOthers = this.dataOthers?.contents
        this.imagesOthers = this.dataOthers?.images
        this.arraysOthers = this.dataOthers?.arrays

        this.editorsOthers010 = [];
        [{ key: 'content010' }]?.forEach((element: any, index: number) => {
          this.editorsOthers010.push(new Editor());
        });

        this.editorsOthers011 = [];
        [{ key: 'content011' }]?.forEach((element: any, index: number) => {
          this.editorsOthers011.push(new Editor());
        });

        this.editorsOthers012 = [];
        [{ key: 'content012' }]?.forEach((element: any, index: number) => {
          this.editorsOthers012.push(new Editor());
        });

        this.editorsOthers013 = [];
        [{ key: 'content013' }]?.forEach((element: any, index: number) => {
          this.editorsOthers013.push(new Editor());
        });

        this.editorsOthers014 = [];
        [{ key: 'content014' }]?.forEach((element: any, index: number) => {
          this.editorsOthers014.push(new Editor());
        });
      },
      (error: any) => {
        console.error('Error fetching data', error);
      }
    );
  }

  getDataForTeamUsPage() {
    this.dataTeamUs = [];
    this.dataService.getDataForTeamUsPage().subscribe(
      (response: any) => {
        this.dataTeamUs = response;
      },
      (error: any) => {
        console.error('Error fetching data', error);
      }
    );
  }

  getDataForImagesPage() {
    this.dataImages = {};
    this.dataService.getDataForImagesPage().subscribe(
      (response: any) => {
        this.dataImages = response;
      },
      (error: any) => {
        console.error('Error fetching data', error);
      }
    );
  }

  updateData() {
    if (this.tab === 'home') {
      Swal.fire({
        text: "คุณต้องการบันทึกข้อมูลใช่หรือไม่?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่ บันทึกข้อมูล",
        cancelButtonText: "ยกเลิก",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.dataHome.contents.content003 = this.dataHome.contents.content003.replace(/#TAB/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
          this.dataService.updateDataForHomePage(this?.dataHome).subscribe((response) => {
            Swal.fire({
              title: "Success",
              text: "แก้ไขข้อมูลเรียบร้อย",
              icon: "success"
            });
            this.getDataForHomePage()
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
    } else if (this.tab === 'about-us') {
      Swal.fire({
        text: "คุณต้องการบันทึกข้อมูลใช่หรือไม่?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่ บันทึกข้อมูล",
        cancelButtonText: "ยกเลิก",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.dataAboutUs.contents.content003 = this.dataAboutUs.contents.content003.replace(/#TAB/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
          this.dataAboutUs.contents.content003 = this.dataAboutUs.contents.content003.replace(/#NEWLINE/g, '<br>');
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
        cancelButtonText: "ยกเลิก",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this?.dataServices?.arrays?.array001?.forEach((element: any) => {
            element.content = element.content.replace(/#TAB/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
            element.content = element.content.replace(/#NEWLINE/g, '<br>');
          });
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
        cancelButtonText: "ยกเลิก",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this?.dataContactUs?.arrays?.array001?.forEach((element: any) => {
            element.description = element.description.replace(/#TAB/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
            element.description = element.description.replace(/#NEWLINE/g, '<br>');
          });

          console.log(this?.dataContactUs)
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
    } else if (this.tab === 'others') {
      Swal.fire({
        text: "คุณต้องการบันทึกข้อมูลใช่หรือไม่?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่ บันทึกข้อมูล",
        cancelButtonText: "ยกเลิก",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.dataOthers.contents.content010 = this.dataOthers.contents.content010.replace(/#TAB/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
          this.dataOthers.contents.content010 = this.dataOthers.contents.content010.replace(/#NEWLINE/g, '<br>');

          this.dataOthers.contents.content011 = this.dataOthers.contents.content011.replace(/#TAB/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
          this.dataOthers.contents.content011 = this.dataOthers.contents.content011.replace(/#NEWLINE/g, '<br>');

          this.dataOthers.contents.content012 = this.dataOthers.contents.content012.replace(/#TAB/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
          this.dataOthers.contents.content012 = this.dataOthers.contents.content012.replace(/#NEWLINE/g, '<br>');

          this.dataOthers.contents.content013 = this.dataOthers.contents.content013.replace(/#TAB/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
          this.dataOthers.contents.content013 = this.dataOthers.contents.content013.replace(/#NEWLINE/g, '<br>');

          this.dataOthers.contents.content014 = this.dataOthers.contents.content014.replace(/#TAB/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
          this.dataOthers.contents.content014 = this.dataOthers.contents.content014.replace(/#NEWLINE/g, '<br>');
          this.dataService.updateDataForOthersPage(this?.dataOthers).subscribe((response) => {
            Swal.fire({
              title: "Success",
              text: "แก้ไขข้อมูลเรียบร้อย",
              icon: "success"
            });
            this.getDataForOthersPage()
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
    } else if (this.tab === 'team-us') {
      Swal.fire({
        text: "คุณต้องการบันทึกข้อมูลใช่หรือไม่?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่ บันทึกข้อมูล",
        cancelButtonText: "ยกเลิก",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.dataService.updateDataForTeamUsPage(this?.dataTeamUs).subscribe((response) => {
            Swal.fire({
              title: "Success",
              text: "แก้ไขข้อมูลเรียบร้อย",
              icon: "success"
            });
            this.getDataForTeamUsPage()
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

  addUser() {
    let id = this.dataTeamUs?.[this.dataTeamUs?.length - 1]?.id
    let user = {
      id: id + 1,
      username: "",
      password: "",
      name: "",
      description: "",
      image: "assets/images/"
    }
    this.dataTeamUs = [...[user], ...this.dataTeamUs]
  }

  deleteUser(indexToRemove: number) {
    Swal.fire({
      text: "คุณต้องการลบผู้ใช้งานใช่หรือไม่?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่ ลบผู้ใช้งาน",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataTeamUs = this.dataTeamUs?.filter((_, index) => index !== indexToRemove);
      }
    });
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  uploadFile() {
    Swal.fire({
      text: "คุณต้องการ Upload รูปภาพใช่หรือไม่?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่ Upload รูปภาพ",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.selectedFile) {
          this.dataService.uploadFile(this.selectedFile).subscribe((response: any) => {
            Swal.fire({
              title: "Success",
              text: "Upload File เรียบร้อย",
              icon: "success"
            });
            window.location.reload();
          }, (error: any) => {
            Swal.fire({
              title: "Error",
              text: error?.message,
              icon: 'error'
            });
          });
        }
      }
    });
  }

  deleteImage(fileName: string) {
    Swal.fire({
      text: "คุณต้องการ ลบรูปภาพใช่หรือไม่?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่ ลบรูปภาพ",
      cancelButtonText: "ยกเลิก",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deleteImage(fileName).subscribe((response: any) => {
          Swal.fire({
            title: "Success",
            text: "ลบรูปภาพเรียบร้อย",
            icon: "success"
          });
          window.location.reload();
        }, (error: any) => {
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
