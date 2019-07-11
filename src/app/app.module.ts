// The file that defines the features of the applications (components).
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {PostCreateComponent} from './posts/post-create/post-create.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        MatProgressSpinnerModule} from '@angular/material';
import {HeaderComponent} from './header/header.component';
import {PostListComponent} from './posts/post-list/post-list.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [ // delectation of the app component so angular is now aware of the component. But it is only aware by only other component
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent
    // so we have to declare the root component inside the bootstrap array.
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent] // we should only have root component inside the bootstrap array and the other component is nested inside
})
export class AppModule { }
