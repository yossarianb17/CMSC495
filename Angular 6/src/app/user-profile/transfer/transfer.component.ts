import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { NgForm } from '@angular/forms';
@Component({ 
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  constructor(private UserService: UserService) { }

  ngOnInit() {
  }
  model = {
    email: ''
  };

  serverErrorMessages: string;
  serverSuccessMessage: boolean;

  onSubmit(form: NgForm) {
    this.UserService.transfer(form.value).subscribe(
      res => {
        this.serverSuccessMessage = true;
        setTimeout(() => this.serverSuccessMessage = false, 4000);
        this.resetForm(form);
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );
  }

  resetForm(form: NgForm) {
    this.UserService.selectedUser = {
      fullName: '',
      email: '',
      password: '',
      balance: 0
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

}
