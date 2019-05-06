import { Routes } from '@angular/router';
import { SignInComponent } from '../components/users/sign-in/sign-in.component';
import { SignUpComponent } from '../components/users/sign-up/sign-up.component';
import { AuthGuard } from '../auth/auth.guard';
import { HomeComponent } from '../components/users/home/home.component';
import { OpentopicComponent } from '../components/opentopic/opentopic.component';
import { TopicContentComponent } from '../components/topic-content/topic-content.component';


export const appRoutes: Routes = [
    //{ path: '', component:SignInComponent },
    { path: '', component:SignInComponent },
    { path: 'signup', component:SignUpComponent },
    { path: 'home', component:HomeComponent,canActivate:[AuthGuard] },
    { path: 'opentopic', component:OpentopicComponent,canActivate:[AuthGuard] },
    { path: 'topic-content/:topicId', component:TopicContentComponent,canActivate:[AuthGuard] },

    //{ path: '**', component: PagenotfoundComponent }
  ];