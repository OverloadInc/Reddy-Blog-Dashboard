import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private angularFirestore: AngularFirestore, private toastr: ToastrService) { }

  loadData() {
    return this.angularFirestore.collection('subscribers').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return {id, data}
        })
      })
    );
  }

  deleteData(id: any) {
    this.angularFirestore.doc(`subscribers/${id}`).delete().then(docRef => {
      this.toastr.success('Subscriber deleted successfully');
    })
  }
}
