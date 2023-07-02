import {Component, OnInit} from '@angular/core';
import {PostsService} from "../../../services/posts.service";

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit{

  postArray: Array<any> = [];

  constructor(private postsService: PostsService) {
  }

  ngOnInit(): void {
    this.postsService.loadData().subscribe(value => {
      this.postArray = value;
    });
  }

  onDelete(postImagePath: string, id: string) {
    this.postsService.deleteImage(postImagePath, id);
  }

  onFeatured(id: string, value: boolean) {
    const featuredData = {
      isFeatured: value
    }

    this.postsService.markFeatured(id, featuredData);
  }
}
