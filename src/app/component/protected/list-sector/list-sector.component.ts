import {Component, inject} from '@angular/core';
import {DynamicTableComponent} from '../../infra/dynamic-table/dynamic-table.component';
import {SpinnerComponent} from '../../infra/spinner/spinner.component';
import {SectorService} from '../../../service/sector.service';

@Component({
  selector: 'app-list-sector',
  imports: [
    DynamicTableComponent,
    SpinnerComponent
  ],
  templateUrl: './list-sector.component.html',
  styleUrl: './list-sector.component.css',
})
export class ListSectorComponent {

  sectorService = inject(SectorService)
  arrSector: Array<any> = []
  constructor() {
    this.fetchSector(true);
  }

  arrColumns: Array<any> = [
    { key: 'sectorName', label: 'Setor de Atividade', sortable: true },
  ]

  isLoading = false;
  toggleLoading() {
    this.isLoading = !this.isLoading;
  }


  fetchSector(toggle: boolean = false) {
    if (toggle) {
      this.toggleLoading();
    }
    this.sectorService.getAllSector().subscribe({
      next: res => {
        this.arrSector = res;
        if (toggle) {
          this.toggleLoading();
        }
      },
      error: err => {},
      complete: () => {}
    })
  }
}
