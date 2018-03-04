import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService, private auth: AuthService, router: Router){
    //Does unsubscribe required? No. Why?
    //Appcomponent is the root component so we have single instance in the DOM. So we have
    //single subscription to  
      auth.user$.subscribe(user => {
        if(!user) return;
          //Storing user to databse
          userService.save(user);

          let returnUrl = localStorage.getItem('returnUrl');
          if(!returnUrl) return;
          
          localStorage.removeItem('returnUrl');
          router.navigateByUrl(returnUrl);
        
      });
  }
}
