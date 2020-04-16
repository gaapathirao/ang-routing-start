import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UsersComponent} from './users/users.component';
import {UserComponent} from './users/user/user.component';
import {ServersComponent} from './servers/servers.component';
import {ServerComponent} from './servers/server/server.component';
import {EditServerComponent} from './servers/edit-server/edit-server.component';
import {PageNotfoundComponent} from './page-notfound/page-notfound.component';
import { AuthGuard } from './auth-guard.service';
import {ErrorpageComponent} from './errorpage/errorpage.component';
import {ServerResolverService} from './servers/server/server-resolver.service';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users' , component: UsersComponent, children: [
      {path: ':id/:name' , component: UserComponent}
    ]},
  {path: 'servers' ,
    //canActivate:[ AuthGuard ],
    canActivateChild:[AuthGuard] ,
    component: ServersComponent,
    children: [
      {path: ':id' , component: ServerComponent, resolve: {server: ServerResolverService}},
      {path: ':id/edit' , component: EditServerComponent}
    ]
  },
  //{path: 'not-found' , component: PageNotfoundComponent},
  {path: 'not-found' , component: ErrorpageComponent , data:{message: 'page not found'}},
  {path: '**' , redirectTo: '/not-found'}

];
@NgModule(
  {
    imports: [
      RouterModule.forRoot(appRoutes)
      //RouterModule.forRoot(appRoutes, {useHash: true})
    ],
    exports: [
      RouterModule
    ]
  }
)
export class AppRoutingModule {

}
