import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HeaderRoutingModule } from './header/header-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ToysComponent } from './toys/toys.component';
import { FooterComponent } from './footer/footer.component';
import { ToyCardComponent } from './toys/toys-desc/toy-card/toy-card.component';
import { HeaderComponent } from './header/header.component';
import { TreeComponent } from './tree/tree.component';
import { ToysControllerComponent } from './toys/toys-controller/toys-controller.component';
import { ShapeComponent } from './toys/toys-controller/shape/shape.component';
import { ToysDescComponent } from './toys/toys-desc/toys-desc.component';
import { ValueSliderComponent } from './toys/toys-controller/value-slider/value-slider.component';
import { ColorComponent } from './toys/toys-controller/color/color.component';
import { SizeComponent } from './toys/toys-controller/size/size.component';
import { FavoriteComponent } from './toys/toys-controller/favorite/favorite.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortSelectComponent } from './toys/toys-controller/sort-select/sort-select.component';
import { AppToysService } from './services/app-toys.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToysComponent,
    FooterComponent,
    ToyCardComponent,
    HeaderComponent,
    TreeComponent,
    ToysControllerComponent,
    ShapeComponent,
    ToysDescComponent,
    ValueSliderComponent,
    ColorComponent,
    SizeComponent,
    FavoriteComponent,
    SortSelectComponent,
  ],
  imports: [
    BrowserModule,
    HeaderRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSelectModule,
    MatCheckboxModule,
    HttpClientModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AppToysService],
  bootstrap: [AppComponent]
})
export class AppModule { }
