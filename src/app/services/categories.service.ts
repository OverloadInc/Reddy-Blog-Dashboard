import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { ToastrService } from "ngx-toastr";
import { map } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private angularFirestore: AngularFirestore, private toastr: ToastrService) { }

  saveData(categoryData: any) {
    this.angularFirestore.collection('categories').add(categoryData).then(docRef => {
      console.log(docRef);
      this.toastr.success('Data insert successfully done');
    }).catch(error => {
      console.log(error);
    });
  }

  loadData() {
    return this.angularFirestore.collection('categories').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return {id, data}
        })
      })
    );
  }

  updateData(id: any, EditData: any) {
    this.angularFirestore.doc(`categories/${id}`).update(EditData).then(docRef => {
      this.toastr.success('Data update successfully');
    });
  }

  deleteData(id: any) {
    this.angularFirestore.doc(`categories/${id}`).delete().then(docRef => {
      this.toastr.success('Data delete successfully');
    })
  }
}
