import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changeServer = false;
  selectedServer ;
  selectFragment;
  constructor(private serversService: ServersService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    this.route.queryParams.subscribe(
      (queryParam: Params) => {
        this.allowEdit = queryParam['allowEdit'] === '1' ? true : false;
      }
    );
    this.route.fragment.subscribe();
    this.route.params.subscribe(
      (params: Params) => {
        this.selectedServer = this.serversService.getServer(+params['id']);
      }
    );
    this.server = this.selectedServer;//this.serversService.getServer(this.selectedServer);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changeServer = true;
    this.router.navigate(['../'],{ relativeTo: this.route});
  }

}
