import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../../../services/categories.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../../models/post";
import {PostsService} from "../../../services/posts.service";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  permalink: string = '';
  imageSource: any = './assets/placeholder-image.jpg';
  selectedImage: any;
  categories: Array<any> = [];

  postForm: FormGroup;

  constructor(private categoryService: CategoriesService, private formBuilder: FormBuilder, private postService: PostsService) {
    this.postForm = formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: [''],
      excerpt: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', Validators.required],
      postImage: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(value => {
      this.categories = value;
    });
  }

  get formControl() {
    return this.postForm.controls;
  }

  onTitleChanged($event: any) {
    const title = $event.target.value;

    this.permalink = title.replace(/\s/g, '-');
  }

  onSubmit() {
    let splittedCategory = this.postForm.value.category.split('-');

    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splittedCategory[0],
        category: splittedCategory[1]
      },
      postImagePath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'New',
      createdAt: new Date()
    };

    this.postService.uploadImage(this.selectedImage, postData);

    this.postForm.reset();
    this.imageSource = './assets/placeholder-image.jpg';
  }

  showPreview($event: any) {
    const reader = new FileReader();

    reader.onload = (e) => {
      if(!e.target) {
        return;
      }

      this.imageSource = e.target.result;
    }

    reader.readAsDataURL($event.target.files[0]);

    this.selectedImage = $event.target.files[0];
  }
}
