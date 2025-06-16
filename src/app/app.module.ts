import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// ✅ Importa los componentes standalone
import { LoginComponent } from './login/login.component';
import { NewUserComponent } from './new-user/new-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TweetsComponent } from './tweets/tweets.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent // solo este porque es el único NO-standalone
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    // 👇 Standalone components van aquí
    LoginComponent,
    NewUserComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    LandingPageComponent,
    TweetsComponent,
    HomeComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
