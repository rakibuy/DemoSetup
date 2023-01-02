import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Exam } from 'src/app/layout/api/exam';
import { ExamService } from 'src/app/layout/service/exam.service';
import { DatePipe } from '@angular/common';


@Component({
    templateUrl: './exam.component.html',
    providers: [MessageService, ConfirmationService]
})
export class  ExamComponent implements OnInit {
  
  exams: Exam[] = [];
  exam: Exam = {
    };
    time = {hour: 13, minute: 30};
   
    examDialog: boolean = false;

    deleteExamDialog: boolean = false;

    submitted: boolean = false;
    date8!: Date;
    date9!: Date;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];
    product!: {};

    constructor(private messageService: MessageService, 
      private confirmationService: ConfirmationService,
      public examService: ExamService,
      public datePipe: DatePipe
      ) { }

    ngOnInit(): void {
      this.getAllExam(this.exam);
    
    }

    getAllExam(exam: Exam){
      this.examService.getAll().subscribe((data: Exam[])=>{
      this.exams=data; 
    })
  }




  deleteExam(exam: Exam) {
      this.deleteExamDialog = true;
      this.exam = { ...exam };
  }


    openNew() {
        this.product = {};
        this.submitted = false;
        this.examDialog = true;
        this.exam = {
        };
    }
    editExam(examData: Exam) {
      let dDate =this.datePipe.transform(examData.date,'yyyy-MM-dd');
      let sTime=this.datePipe.transform(examData.startTime,'shortTime');
      let eTime=this.datePipe.transform(examData.endTime,'shortTime');
      
      
      examData.date=dDate;
      examData.startTime=sTime;
      examData.endTime=eTime;

      this.exam = { ...examData };
      this.examDialog = true;
    }

    confirmDelete() {
        this.deleteExamDialog = false;
        
        this.examService.delete(this.exam.id).subscribe(res => {
          this.exams = this.exams.filter(item => item.id !== this.exam.id);
        })
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Exam Deleted', life: 3000 });
        this.product = {};
    }

    onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

    hideDialog() {
      this.examDialog = false;
      this.submitted = false;
  }

  addOrUpdateExam(){
    this.submitted = true;
    
      if(
        this.exam.name?.trim() &&
        this.exam.date?.trim() &&
        this.exam.endTime?.valueOf() &&
        this.exam.startTime?.valueOf() &&
        this.exam.examCode?.valueOf()
      ){
        if(this.exam.id){
        
          this.examService.update(this.exam.id, this.exam).subscribe(res => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Exam updated', life: 3000 });
            this.getAllExam(this.exam);
          })
        }
        else{
         
          this.examService.create(this.exam).subscribe(res => {
            
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Exan Added', life: 3000 });
            this.getAllExam(this.exam);
          })
        }
      this.exams = [...this.exams]
      this.examDialog = false;
      this.product = {};
      this.exam = {};

      }
     

    
          
  }
}

