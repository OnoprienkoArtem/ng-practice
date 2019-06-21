import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './films-catalog/main/main.component';
import { FilmsListComponent } from './films-catalog/films-list/films-list.component';
import { ActorsListComponent } from './films-catalog/actors-list/actors-list.component';
import { SearchResultComponent } from './films-catalog/search-result/search-result.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "main" },
  { path: "main", component: MainComponent },
  { path: "films-list", component: FilmsListComponent },
  { path: "actors-list", component: ActorsListComponent },
  { path: "search-result", component: SearchResultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
