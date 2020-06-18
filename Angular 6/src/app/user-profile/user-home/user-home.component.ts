import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  userDetails;
  transactionDetails;
  userEmail;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.userEmail = this.userDetails.email;
      },
      err => { 
        console.log(err);
        
      }
    );
    this.userService.getTransactionHistory().subscribe(
      res=> {
        this.transactionDetails = res['transaction'];
        console.log(res['transaction']);
        console.log("after log");
      },
      err=> {
      console.log(err);
    }
    );
  }
 
}
