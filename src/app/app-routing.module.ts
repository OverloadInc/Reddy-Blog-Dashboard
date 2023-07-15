import { NgModule } from '@angular/core';
import {Route, RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {CategoriesComponent} from "./components/categories/categories.component";
import {AllPostsComponent} from "./components/posts/all-posts/all-posts.component";
import {NewPostComponent} from "./components/posts/new-post/new-post.component";
import {LoginComponent} from "./components/auth/login/login.component";

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'posts', component: AllPostsComponent},
  {path: 'posts/new', component: NewPostComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
