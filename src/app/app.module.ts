import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MainScreenComponent } from './components/main-screen/main-screen.component';
import { ApiService } from './service/api.service';
import { AboutScreenComponent } from './components/about-screen/about-screen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent,
    AboutScreenComponent
  ],
  imports: [
    BrowserModule,
	  AppRoutingModule,
	  HttpClientModule,
	  FormsModule,
	  ReactiveFormsModule,
	  BrowserAnimationsModule,
    MatTableModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
