import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Session } from 'src/app/layout/api/session';
import { SessionService } from 'src/app/layout/service/session.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: './session.component.html',
    providers: [MessageService, ConfirmationService]
})
export class SessionComponent implements OnInit {
  form!: FormGroup;
  sessions: Session[] = [];
  session: Session = {
    };
    sessionDialog: boolean = false;

    deleteSessionDialog: boolean = false;

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];
    product!: {};

    constructor(private messageService: MessageService, 
      private confirmationService: ConfirmationService,
      public sessionService: SessionService) { }

    ngOnInit(): void {
      this.getAllSession(this.session);
      this.form = new FormGroup({
        name: new FormControl('',[Validators.required, Validators.minLength(3)]),
        duration: new FormControl('',[Validators.required])
      });
    }

    getAllSession(session: Session){
      this.sessionService.getAll().subscribe((data: Session[])=>{
      this.sessions=data;
    })
  }

  get f(){
    return this.form.controls;
  }


  deleteSession(session: Session) {
      this.deleteSessionDialog = true;
      this.session = { ...session };
  }


    openNew() {
        this.product = {};
        this.submitted = false;
        this.sessionDialog = true;
        this.session={}
    }

    editUiversity(session: Session) {
      this.session = { ...session };
      this.sessionDialog = true;
    }
    
    confirmDelete() {
        this.deleteSessionDialog = false;
        this.sessionService.delete(this.session.id).subscribe(res => {
          this.sessions = this.sessions.filter(item => item.id !== this.session.id);
        })
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Session Deleted', life: 3000 });
        this.product = {};
    }

    onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

    hideDialog() {
      this.sessionDialog = false;
      this.submitted = false;
  }

  addOrUpdateSession(){
    this.submitted = true;

          if(this.session.id){
           
            this.sessionService.update(this.session.id, this.session).subscribe(res => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Session updated', life: 3000 });
              this.getAllSession(this.session);
            })
          }
          else{
            
            this.sessionService.create(this.session).subscribe(res => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Session Added', life: 3000 });
              this.getAllSession(this.session);
            })
          }
        this.sessions = [...this.sessions]
        this.sessionDialog = false;
        this.product = {};
        this.session={}
  }
}

