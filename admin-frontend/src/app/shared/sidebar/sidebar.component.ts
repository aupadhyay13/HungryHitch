import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  constructor(private router: Router)
  {

  }

  ngOnInit(): void {
    $('[data-widget="treeview"]').Treeview('init');
  }


  navigateToPage(page : string){
    this.router.navigate([`${page}`])
  }

}
