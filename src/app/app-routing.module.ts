import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {CategoriesComponent} from "./components/categories/categories.component";
import {AllPostsComponent} from "./components/posts/all-posts/all-posts.component";
import {NewPostComponent} from "./components/posts/new-post/new-post.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {AuthGuard} from "@angular/fire/auth-guard";
import {SubscribersComponent} from "./components/subscribers/subscribers.component";

const routes: Routes = [
  {path: '', component: DashboardComponent/*, canActivate: [AuthGuard]*/},
  {path: 'login', component: LoginComponent},
  {path: 'categories', component: CategoriesComponent/*, canActivate: [AuthGuard]*/},
  {path: 'posts', component: AllPostsComponent/*, canActivate: [AuthGuard]*/},
  {path: 'posts/new', component: NewPostComponent/*, canActivate: [AuthGuard]*/},
  {path: 'subscribers', component: SubscribersComponent/*, canActivate: [AuthGuard]*/}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {

}
