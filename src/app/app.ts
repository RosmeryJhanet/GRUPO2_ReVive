import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Menucomponent } from './components/menucomponent/menucomponent';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menucomponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ReviveFront');
  mostrarMenuAdmin = signal(true);

  constructor(private router: Router) {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      this.mostrarMenuAdmin.set(this.router.url !== '/homes' && this.router.url !== '/');
    });
  }
}
