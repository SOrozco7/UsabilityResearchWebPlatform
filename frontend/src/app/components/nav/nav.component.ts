import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {


  }

  logout() {

    this.router.navigate(['logout']);
  }

}
