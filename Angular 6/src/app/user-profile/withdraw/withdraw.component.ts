import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  constructor(private UserService: UserService) { }

  model = {
    balance: ''
  };
  serverErrorMessages: string;
  serverSuccessMessage: boolean;
  errors: boolean;

  ngOnInit() {
  }


  onSubmit(form: NgForm) {
    this.UserService.withdraw(form.value).subscribe(
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
