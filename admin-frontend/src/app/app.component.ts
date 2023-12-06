import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'admin-frontend';
  enableTheme = false;

  constructor(private authService: AuthService){
    
  }

  ngOnInit(): void {
    this.authService.enableAllTheme.asObservable().subscribe((status) => {
      this.enableTheme = status;
    });
  }
}
