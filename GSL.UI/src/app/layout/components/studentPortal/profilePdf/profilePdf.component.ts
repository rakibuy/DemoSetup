import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';

import jsPDF from 'jspdf';
import { ConfirmationService, MessageService } from 'primeng/api';

import { PersonalInformation } from 'src/app/layout/api/PersonalInformation';
import { User } from 'src/app/layout/api/user';
import { PersonalInformationService } from 'src/app/layout/service/PersonalInformationService';
import { UserService } from 'src/app/layout/service/user.service';


@Component({
    templateUrl: './profilePdf.component.html',
    styleUrls:['./profilePdf.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class ProfilePdfComponent implements OnInit {

  userIdActive:number=0;
  //users
  users:User[]=[]
  user:User={}
  pInfo:PersonalInformation={
    userId:this.userIdActive
  }
 

 //common
 product!: {};
 submitted: boolean = false;
 cols: any[] = [];
 statuses: any[] = [];
 rowsPerPageOptions = [5, 10, 20];

    constructor(
      private userService:UserService,
      private activatedRoute:ActivatedRoute,
      private personalInfoService:PersonalInformationService
      ) { }

    ngOnInit(): void {
      this.userIdActive = this.activatedRoute.snapshot.params['id'];
       //Users
       this.userService.find(this.userIdActive).subscribe((data:any)=>{
        this.user =data;
      })

       //Personal Information
       this.personalInfoService.GetUserById(this.userIdActive).subscribe((data:any)=>{
        this.pInfo=data;
        console.log(this.pInfo)
        
      })


    }

    @ViewChild('htmlData') htmlData!: ElementRef;
  USERS = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'sincere@april.biz',
      phone: '1-770-736-8031 x56442',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'shanna@melissa.tv',
      phone: '010-692-6593 x09125',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      email: 'nathan@yesenia.net',
      phone: '1-463-123-4447',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'julianne@kory.org',
      phone: '493-170-9623 x156',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'lucio@annie.ca',
      phone: '(254)954-1289',
    },
    {
      id: 6,
      name: 'Mrs. Dennis',
      email: 'karley@jasper.info',
      phone: '1-477-935-8478 x6430',
    },
  ];
  
  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }















//   //pdf
//   @ViewChild('content', {static:false}) el!:ElementRef;

//   onConfirm() {
//     const pages = document.querySelector('.all-pages') as HTMLElement;
//     this.workspaceService.exportAllToPDF(pages);
// }

// exportAllToPDF(pages: HTMLElement) {
//   const doc = new jsPDF({
//     unit: 'px',
//     format: this.pdfOptions.value.pageFormat === 'A4' ? [595, 842] : [842, 1191]
//   });

//   doc.html(pages, {
//     callback: (doc: jsPDF) => {
//       doc.deletePage(doc.getNumberOfPages());
//       doc.save('pdf-export');
//     }
//   });
// }



//   makePdf(){
//     let pdf = new jsPDF('p', 'pt', 'a4',false)
//     pdf.html(this.el.nativeElement,{
//       callback:(pdf)=>{
//         pdf.save("demo.pdf")
//       }
//     });
//   }

  



  



    

}

