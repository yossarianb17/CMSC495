import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../shared/user.service';
// import { UserService } from '../../shared/user.service';
// declare var M: any;

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})

export class DepositComponent implements OnInit {

  constructor(private UserService: UserService) { }

  model = {
    balance: ''
  };

  serverErrorMessages: string;
  serverSuccessMessage: boolean;
  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.UserService.deposit(form.value).subscribe(
      res => {
        this.serverSuccessMessage = true;
        // M.toast({Html: "deposited successfully", class:"rounded"});
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
