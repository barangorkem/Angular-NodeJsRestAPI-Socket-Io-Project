import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { appRoutes} from './routes/routes';
import { AppComponent } from './app.component';
import { SignUpComponent } from './components/users/sign-up/sign-up.component';
import { SignInComponent } from './components/users/sign-in/sign-in.component';
import { UserService } from './shared/services/user.service';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './components/users/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { OpentopicComponent } from './components/opentopic/opentopic.component';
import { TopicContentComponent } from './components/topic-content/topic-content.component';
import { SiteService } from './shared/services/site.service';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    HeaderComponent,
    OpentopicComponent,
    TopicContentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes,{
      enableTracing:true
    })
  ],
  providers: [UserService,AuthGuard,SiteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
