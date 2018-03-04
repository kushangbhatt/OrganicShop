//Use this to work with user object stored in database
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
//import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';

import * as firebase from 'firebase';
import { AppUser } from './models/app-user';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User){
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string): AngularFireObject<AppUser> {
    return this.db.object('/users/' + uid); 
  }

}
