//When user go to check out, if they are not login then first they login then check out
//To protect that route we use  route guard
//Go to appmodule and apply this guard to the routes you want to protect

import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate{
  //to get authentication state we import AuthService
  //to navigate user we inject router service
  constructor(private auth: AuthService, private router: Router) { }

  //This method return true or false
  //Here we get authentication status of user
  //If user loged in return true
  //otherwise navigate them to login page and return false
  
  canActivate(route, state: RouterStateSnapshot){
    //access user$ observable subscribe to it we get user object
    //Here we are subscribing but this is service not component so we can not destroy/unsubscribe
    //Instead of subscribing this observable of firebase user object, we can transform it to boolean using map
    //this.auth.user$.subscribe(user => {
      //We are mapping observable of firebase user to an observable of boolean
    return this.auth.user$.map(user => {
      if(user) return true;

      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      return false;
    });
  }

}
