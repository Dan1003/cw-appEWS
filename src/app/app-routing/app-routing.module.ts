import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainScreenComponent } from '../components/main-screen/main-screen.component';
import { AboutScreenComponent } from '../components/about-screen/about-screen.component';
 
const routes: Routes = [
 { path: '', pathMatch: 'full', redirectTo: 'about-screen' },
 { path: 'main-screen', component: MainScreenComponent },
 { path: 'about-screen', component: AboutScreenComponent }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})



export class AppRoutingModule { }
