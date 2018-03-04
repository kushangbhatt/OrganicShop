import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase'; 
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
//import 'rxjs/add/operator/of';

@Injectable()
export class AuthService {
  //authState is an observable of firebase.user type
  //user: firebase.User;

  //change this user to an observable
  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute) {
    //How do we know we are logout or not. for that use authState which return observable of auth state
    //afAuth.authState.subscribe(user => this.user = user);
    this.user$ = afAuth.authState;

    //You should always unsubscribe from firebase observable
    //When working with firebase you are dealing with asynchronus stream of data
    //This is different from consuming Http seervices using Http class in angular
    //Because when we subscribe to observable return from Http class in angular, angular automatically
    //terminate that observable

    //1) Implement onDestroy: when our component destroy we unsubscribe
    //2) Use Async pipe: Simpler and cleaner, Automatically unsubscribe from the observable when component destryo
   }

   login(){
     //Before sending user to google we want to store url in local storage
     //For that we add parameter to constructor of ActivatedRoute, with this we can get current route 
     //extract returnurl parameter
     let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
     //store this to local storage
     localStorage.setItem('returnUrl', returnUrl);
     
     //now send user to google
     //This is all about integrating firebase, redirecting user to google login page
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());

   }

   logout(){
    this.afAuth.auth.signOut();
   }


   get appUser$() : Observable<AppUser>{
    return this.user$.
    switchMap(user => {
      if(user) return this.userService.get(user.uid).valueChanges();

      return Observable.of(null);
    });
   }

}
