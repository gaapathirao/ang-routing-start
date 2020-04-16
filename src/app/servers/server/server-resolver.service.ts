import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/observable';
import {ServersService} from '../servers.service';
import {Injectable} from '@angular/core';

interface Server {
  id: number;
  name: string;
  status: string;
}

@Injectable({ providedIn: 'root' })
export class ServerResolverService implements Resolve<Server> {
  constructor(private serversService: ServersService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
    //console.log(route.params['id']);
    //console.log(this.serversService.getServer());
    return this.serversService.getServer(+route.params['id']);
  }
}
