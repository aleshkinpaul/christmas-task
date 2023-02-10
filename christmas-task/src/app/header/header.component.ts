import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IToy } from '../services/app-toys.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void { }
}
