import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.scss'
})
export class ServiceDetailComponent {
  code: any = "";
  contents = {
    content001: "อาหารและยา (อย.)",
    content002: "อย. ย่อมาจาก สำนักงานคณะกรรมการอาหารและยา (Food and Drug Administration – FDA) มีหน้าที่ปกป้องสุขภาพของประชาชนโดยการรับรองความปลอดภัย ประสิทธิภาพ และความมั่นคงของยาสำหรับมนุษย์และยารักษาสัตว์ ผลิตภัณฑ์ชีวภาพ และ อุปกรณ์ทางการแพทย์ "
  }

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.code = params.get('code');
    });
  }
}
