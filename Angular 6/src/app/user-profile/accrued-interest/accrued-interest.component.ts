import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-accrued-interest',
  templateUrl: './accrued-interest.component.html',
  styleUrls: ['./accrued-interest.component.css']
})
export class AccruedInterestComponent implements OnInit {
  userDetails;
  dailyInterest;
  response: boolean;
  calculated: Number;
  constructor(private userService: UserService, private router: Router) { }

  model = {
    date: '',
    value: ''
  }
  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => { 
        console.log(err);
        
      }
    );
  }
  calculate(form: NgForm) {
    var interestRate = this.interestRate(this.userDetails.accountType);
    var current = new Date();
    var inputDate = form.value.date;
    console.log(this.difference(current, inputDate));
    var accruedInterest = ((interestRate / 365) * this.difference(current, inputDate) * this.userDetails.balance) + this.userDetails.balance;
    accruedInterest = Math.round(accruedInterest * 1000)/1000;
    this.calculated = accruedInterest;
    this.response = true;
    console.log(accruedInterest);
    
  }

   difference(date1, date2) {
    var dt1 = new Date(date1);
    var dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
    }

    interestRate(accountType) {
      if(accountType == "checking") {
        return 0.06;
      }
      if (accountType == "saving") {
        return 0.22;
      }
    }
}
