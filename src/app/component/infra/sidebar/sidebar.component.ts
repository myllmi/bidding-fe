import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {

  router = inject(Router)

  protected goHome() {
    this.router.navigate(['']).then();
  }

  protected goListResume() {
    this.router.navigate(['/list-resume']).then();
  }

  protected goListBid() {
    this.router.navigate(['/list-bid']).then();
  }

  protected goListProject() {
    this.router.navigate(['/list-project']).then();
  }

  protected goListCustomer() {
    this.router.navigate(['/list-customer']).then();
  }

  protected goListBusinessSector() {
    this.router.navigate(['/list-sector']).then();
  }
}
