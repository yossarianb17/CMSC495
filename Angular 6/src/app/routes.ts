import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DepositComponent } from './user-profile/deposit/deposit.component';
import { WithdrawComponent } from './user-profile/withdraw/withdraw.component';
import { TransferComponent } from './user-profile/transfer/transfer.component';
import { AccruedInterestComponent } from './user-profile/accrued-interest/accrued-interest.component';
import { UserHomeComponent } from './user-profile/user-home/user-home.component';
import { AuthGuard } from './auth/auth.guard';
import { Component } from '@angular/core';

export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: '#!', component: UserProfileComponent,canActivate:[AuthGuard],
    },
    {
        path: 'userprofile', component: UserProfileComponent,
        children: [{ path: '', component: UserHomeComponent}],canActivate:[AuthGuard]
    },
    {
        path: 'withdraw', component: UserProfileComponent, 
        children: [{path: '', component:WithdrawComponent}],canActivate:[AuthGuard]
    },
    {
        path: 'deposit', component: UserProfileComponent, 
        children: [{path: '', component:DepositComponent}],canActivate:[AuthGuard]
    },
    {
        path: 'transfer', component: UserProfileComponent, 
        children: [{path: '', component:TransferComponent}],canActivate:[AuthGuard]
    },
    {
        path: 'accruedinterest', component: UserProfileComponent, 
        children: [{path: '', component:AccruedInterestComponent}],canActivate:[AuthGuard]
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
];