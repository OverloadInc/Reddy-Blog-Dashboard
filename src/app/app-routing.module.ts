import { NgModule } from '@angular/core';
import {Route, RouterModule, Routes} from "@angular/router";

// Build the routes to access the different pages of the website
const routes: Routes = [

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
