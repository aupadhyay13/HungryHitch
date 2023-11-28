import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchTerm = '';
  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm){this.searchTerm = params.searchTerm;
      } else {
      this.searchTerm = '';
    }
  });
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  search(term: string): void {
    if (term) {
      this.router.navigate(['/home'], { queryParams: { term: this.searchTerm } });

    } else {
      this.router.navigate(['/home'], { queryParams: {  } });
    }
  }

}
