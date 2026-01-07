import {Component, inject} from '@angular/core';
import {DynamicTableComponent} from '../../infra/dynamic-table/dynamic-table.component';
import {SpinnerComponent} from '../../infra/spinner/spinner.component';
import {ProjectService} from '../../../service/project.service';

@Component({
  selector: 'app-list-project',
  imports: [
    DynamicTableComponent,
    SpinnerComponent
  ],
  templateUrl: './list-project.component.html',
  styleUrl: './list-project.component.css',
})
export class ListProjectComponent {

  arrColumns: Array<any> = [
    { key: 'customer_name', label: 'Nome do Cliente', sortable: true },
    { key: 'project_name', label: 'Título do Projeto', sortable: true },
    { key: 'reference', label: 'Referência', sortable: true }
  ]

  // Modal Box Config
  isModalOpen = false;
  openModal() {
    this.isModalOpen = true;
  }
  onConfirm() {
    alert('Confirmed!');
    this.isModalOpen = false;
  }

  // Spinner Config
  isLoading = false;
  toggleLoading() {
    this.isLoading = !this.isLoading;
  }

  // Resume Service
  projectService = inject(ProjectService)

  arrProject: Array<any> = []
  constructor() {
    this.toggleLoading();
    this.projectService.getAllProject().subscribe({
      next: res => {
        this.arrProject = res;
        this.toggleLoading();
      },
      error: err => {},
      complete: () => {}
    })
  }
}
