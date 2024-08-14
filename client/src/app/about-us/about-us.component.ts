import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss', './../../styles.scss']
})
export class AboutUsComponent {
  contents = {
    content001: "เกี่ยวกับเรา",
    content002: "บริษัท อินเทลลิเจนท์ โกลบอล จำกัด",
    content003: "&nbsp;&nbsp;&nbsp;&nbsp;บริษัท อินเทลลิเจนท์ โกลบอล จำกัด มีความเชี่ยวชาญด้านการขึ้นทะเบียนในด้านต่างๆกับหน่วยงานภาครัฐ เช่น อย. สมอ. งานด้านนวัตกรรม และกรมทรัพย์สินทางปัญญา เพื่อตอบสนองความต้องการของลูกค้า เรามีบริการที่ครอบคลุมทุกความต้องการ เช่น การให้คำปรึกษา การจัดทำเอกสารในหลายภาษา (ไทย อังกฤษ หรือ จีน) และเข้าร่วมการตรวจสอบกับทางเจ้าหน้าที่ ด้วยทีมงานที่มีความเชี่ยวชาญและประสบการณ์สูง เรายินดีให้บริการคำปรึกษาและบริการเพื่อสร้างภาพลักษณ์ที่น่าเชื่อถือให้กับธุรกิจของคุณ หากคุณต้องการสร้างคุณค่าสำหรับผลิตภัณฑ์และการบริการของคุณ  ทาง บริษัท อินเทลลิเจนท์ โกลบอล จำกัด พร้อมที่จะให้คำปรึกษาและนำพาธุรกิจของคุณไปสู่เป้าหมาย"
  }

  images = {
    image001: "assets/images/about-us/about-us-001.jpg",
    image002: "assets/images/about-us/about-us-002.jpg"
  }



  constructor(private router: Router) {}
  
}
