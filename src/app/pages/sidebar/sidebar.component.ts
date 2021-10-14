import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit {

  constructor(private navService: NavigationService) { }

  ngOnInit(): void {
  }



}
