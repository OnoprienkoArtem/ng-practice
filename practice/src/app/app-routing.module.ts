import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './films-catalog/main/main.component';
import { FilmsListComponent } from './films-catalog/films-list/films-list.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "main" },
  { path: "main", component: MainComponent },
  { path: "films", component: FilmsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
