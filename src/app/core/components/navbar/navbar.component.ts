import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  searchText: string;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public onSearch(): void {
    console.log(this.searchText);
    this.router.navigate(['/search'], {
      queryParams: { q: this.searchText, page: 1, type: 'All' },
    });
  }

  public onKeyPress($event: KeyboardEvent): void {
    if ($event.key === 'Enter') {
      this.onSearch();
    }
  }
}
