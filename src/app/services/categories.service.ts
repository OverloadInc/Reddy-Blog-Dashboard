import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { ToastrService } from "ngx-toastr";

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
}
