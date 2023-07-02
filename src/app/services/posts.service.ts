import {Injectable, OnInit} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Post} from "../models/post";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PostsService implements OnInit {

  constructor(private fireStorage: AngularFireStorage, private firestore: AngularFirestore, private toastr: ToastrService, private router: Router) {
  }

  ngOnInit(): void {
  }

  uploadImage(selectedImage: any, postData: Post, formStatus: string, id: string) {
    const filePath = `postImage/${Date.now()}`;

    this.fireStorage.upload(filePath, selectedImage).then(() => {

      this.fireStorage.ref(filePath).getDownloadURL().subscribe(URL => {
        postData.postImagePath = URL;

        if(formStatus == 'Edit') {
          this.updateData(id, postData);
        }
        else {
          this.savePostData(postData);
        }
      })
    });
  }

  savePostData(postData: Post) {
    this.firestore.collection('posts').add(postData).then(docRef => {
      this.toastr.success('Post uploaded successfully');
      this.router.navigate(['/posts']);
    });
  }

  loadData() {
    return this.firestore.collection('posts').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return {id, data}
        })
      })
    );
  }

  loadOneData(id: string) {
    return this.firestore.doc(`posts/${id}`).valueChanges();
  }

  updateData(id: string, postData: Post) {
    this.firestore.doc(`posts/${id}`).update(postData).then(() => {
      this.toastr.success('Post updated successfully');
      this.router.navigate(['/posts']);
    });
  }

  deleteImage(postImagePath: string, id: string) {
    this.fireStorage.storage.refFromURL(postImagePath).delete().then(() => {
      this.deleteData(id);
    })
  }

  deleteData(id: string) {
    this.firestore.doc(`posts/${id}`).delete().then(() => {
      this.toastr.warning("Post deleted successfully");
    })
  }

  markFeatured(id: string, featuredData: any) {
    this.firestore.doc(`posts/${id}`).update(featuredData).then(() => {
      this.toastr.info("Featured status successfully updated");
    })
  }
}
