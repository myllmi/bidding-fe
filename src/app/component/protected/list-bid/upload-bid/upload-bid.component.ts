import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {BidService} from '../../../../service/bid.service';
import {CustomerService} from '../../../../service/customer.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-upload-bid',
  imports: [
    FormsModule
  ],
  templateUrl: './upload-bid.component.html',
  styleUrl: './upload-bid.component.css',
})
export class UploadBidComponent implements OnInit {

  @Input() isOpen = false;
  @Input() title = 'Modal Title';
  @Output() closed = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<void>();

  isDragging = false;
  files: File[] = [];

  bidService = inject(BidService)

  arrCustomer: Array<any> = [];
  customerService = inject(CustomerService)
  customerId: string = "";

  ngOnInit(): void {
    this.customerService.getAllCustomer().subscribe({
      next: res => {
        this.arrCustomer = Array.isArray(res) ? res : []
        this.customerId = res[0].id;
      },
      error: err => {},
      complete: () => {}
    })
  }

  close(): void {
    this.isOpen = false;
    this.files = [];
    this.closed.emit();
  }

  confirm(): void {
    if (this.files.length <= 0) return;

    const formData = new FormData();
    formData.append('customer_id', this.customerId)
    this.files.forEach((file: File) => {
      formData.append('files', file);
    })

    this.bidService.uploadBid(formData).subscribe({
      next: () => {
        this.isOpen = false;
        this.files = [];
        this.confirmed.emit();
      },
      error: (err) => console.error('Upload error', err),
      complete: () => {
      }
    })

  }

  onFileBrowse($event: any) {
    this.files = Array.from($event.target.files) as File[];
    $event.target.value = ''; // reset input
  }

  protected onDrop($event: DragEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    this.isDragging = false;
    this.files = $event.dataTransfer
      ? Array.from($event.dataTransfer.files)
      : [];
  }

  onDragOver($event: DragEvent) {
    $event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave($event: DragEvent) {
    $event.preventDefault();
    this.isDragging = false;
  }
}

