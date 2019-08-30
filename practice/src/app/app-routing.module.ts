import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth-guard.service';

import { MainComponent } from './films-catalog/main/main.component';
import { FilmsListComponent } from './films-catalog/films-list/films-list.component';
import { ActorsListComponent } from './films-catalog/actors-list/actors-list.component';
import { FavoritesListComponent } from './films-catalog/favorites-list/favorites-list.component';
import { SearchResultComponent } from './films-catalog/search-result/search-result.component';
import { DetailsComponent } from './films-catalog/details/details.component';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", component: LoginComponent },
  { path: "main", component: MainComponent, canActivate: [AuthGuard] },
  { path: "films", component: FilmsListComponent, canActivate: [AuthGuard] },
  { path: "actors", component: ActorsListComponent, canActivate: [AuthGuard] },
  { path: "favorites", component: FavoritesListComponent, canActivate: [AuthGuard] },
  { path: "search-result", component: SearchResultComponent, canActivate: [AuthGuard] },
  { path: "films/details/:id", component: DetailsComponent, canActivate: [AuthGuard] },
  { path: "actors/details/:id", component: DetailsComponent, canActivate: [AuthGuard] },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
