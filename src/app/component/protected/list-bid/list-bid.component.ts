import {Component, inject} from '@angular/core';
import {DynamicTableComponent} from '../../infra/dynamic-table/dynamic-table.component';
import {SpinnerComponent} from '../../infra/spinner/spinner.component';
import {BidService} from '../../../service/bid.service';
import {UploadBidComponent} from './upload-bid/upload-bid.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-bid',
  imports: [
    DynamicTableComponent,
    SpinnerComponent,
    UploadBidComponent
  ],
  templateUrl: './list-bid.component.html',
  styleUrl: './list-bid.component.css',
})
export class ListBidComponent {

  arrColumns: Array<any> = [
    { key: 'customer_name', label: 'Nome da Entidade', sortable: true },
    { key: 'reference', label: '# Referência', sortable: true },
    { key: 'object', label: 'Título', sortable: true },
    { key: 'on_evaluation', label: 'Status', sortable: false }
  ]

  // Upload Config
  isUploadOpen = false;
  openUpload() {
    this.isUploadOpen = true;
  }
  onConfirmUpload() {
    this.isUploadOpen = false;
    this.fetchBid(true);
  }

  // Spinner Config
  isLoading = false;
  toggleLoading() {
    this.isLoading = !this.isLoading;
  }

  // Resume Service
  bidService = inject(BidService)

  fetchBid(toggle: boolean = false) {
    if (toggle) {
      this.toggleLoading();
    }
    this.bidService.getAllBid().subscribe({
      next: res => {
        this.arrBid = res;
        if (toggle) {
          this.toggleLoading();
        }
      },
      error: err => {},
      complete: () => {}
    })
  }

  arrBid: Array<any> = []
  constructor() {
    this.fetchBid(true);
  }

  protected onEvaluate($event: any) {
    this.bidService.evaluateBid($event.id).subscribe({
      next: res => {
        this.fetchBid(true);
      },
      error: err => {},
      complete: () => {}
    })
  }

  router = inject(Router)

  protected onPreview($event: any) {
    this.router.navigate(['/preview-bid', $event.id]).then();
  }
}
