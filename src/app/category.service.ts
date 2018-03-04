import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories(){
    return this.db.list('/categories', ref => ref.orderByChild('name'));
  }

  getAll(){
    return this.db.list('/categories').snapshotChanges()
    .map(actions => {
        return actions.map(action => ({
            $key: action.key,
            value: action.payload.val(),
        }))
    });
  }

}
