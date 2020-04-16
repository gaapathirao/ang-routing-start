import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AppAuthService} from '../app-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private appAuthService: AppAuthService) { }

  ngOnInit() {
  }

  loadServer(id){
    this.router.navigate(['/servers',id , 'edit'], {queryParams:{'allowEdit': 1}, fragment:'lodding'});
  }

  logIn() {
    this.appAuthService.logIn();
  }
  logOut() {
    this.appAuthService.logOut();
  }

}
