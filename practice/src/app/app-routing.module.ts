import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth-guard.service';

import { MainComponent } from './films-catalog/main/main.component';
import { FilmsListComponent } from './films-catalog/films-list/films-list.component';
import { ActorsListComponent } from './films-catalog/actors-list/actors-list.component';
import { SearchResultComponent } from './films-catalog/search-result/search-result.component';
import { DetailsComponent } from './films-catalog/details/details.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { 
    path: "", 
    pathMatch: "full", 
    redirectTo: "login" 
  },
  {
    path: "login",
    component: LoginComponent
  },
  { 
    path: "main", 
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: "films-list", 
    component: FilmsListComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: "actors-list", 
    component: ActorsListComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: "search-result", 
    component: SearchResultComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: "details",
    component: DetailsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
