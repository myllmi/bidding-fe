import {Component, inject} from '@angular/core';
import {CustomerService} from '../../../service/customer.service';
import {DynamicTableComponent} from '../../infra/dynamic-table/dynamic-table.component';
import {SpinnerComponent} from '../../infra/spinner/spinner.component';

@Component({
  selector: 'app-list-customer',
  imports: [
    DynamicTableComponent,
    SpinnerComponent
  ],
  templateUrl: './list-customer.component.html',
  styleUrl: './list-customer.component.css',
})
export class ListCustomerComponent {

  customerService = inject(CustomerService)
  arrCustomer: Array<any> = []
  constructor() {
    this.fetchSector(true);
  }

  arrColumns: Array<any> = [
    { key: 'customerName', label: 'Cliente', sortable: true },
    { key: 'contactName', label: 'Contato', sortable: true },
    { key: 'phoneNumber', label: 'Telefone', sortable: true },
    { key: 'sectorName', label: 'Setor', sortable: true },
  ]

  isLoading = false;
  toggleLoading() {
    this.isLoading = !this.isLoading;
  }

  fetchSector(toggle: boolean = false) {
    if (toggle) {
      this.toggleLoading();
    }
    this.customerService.getAllCustomer().subscribe({
      next: res => {
        this.arrCustomer = res;
        if (toggle) {
          this.toggleLoading();
        }
      },
      error: err => {},
      complete: () => {}
    })
  }
}
