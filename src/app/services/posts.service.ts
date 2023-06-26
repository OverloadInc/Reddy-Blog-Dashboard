import {Injectable, OnInit} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Post} from "../models/post";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class PostsService implements OnInit {

  constructor(private fireStorage: AngularFireStorage, private firestore: AngularFirestore, private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  uploadImage(selectedImage: any, postData: Post) {
    const filePath = `postImage/${Date.now()}`;

    this.fireStorage.upload(filePath, selectedImage).then(() => {

      this.fireStorage.ref(filePath).getDownloadURL().subscribe(URL => {
        postData.postImagePath = URL;

        this.savePostData(postData);
      })
    });
  }

  savePostData(postData: Post) {
    this.firestore.collection('posts').add(postData).then(docRef => {
      this.toastr.success('Post uploaded successfully')
    });
  }
}
