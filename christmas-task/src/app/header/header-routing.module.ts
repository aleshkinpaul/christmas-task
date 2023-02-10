import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ToysComponent } from '../toys/toys.component';
import { TreeComponent } from '../tree/tree.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'toys', component: ToysComponent},
  {path: 'tree', component: TreeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HeaderRoutingModule { }
