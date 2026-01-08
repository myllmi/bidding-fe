import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {NgIf} from '@angular/common';
import {BidService} from '../../../../service/bid.service';

@Component({
  selector: 'app-upload-bid',
  imports: [
    NgIf
  ],
  templateUrl: './upload-bid.component.html',
  styleUrl: './upload-bid.component.css',
})
export class UploadBidComponent {

  @Input() isOpen = false;
  @Input() title = 'Modal Title';
  @Output() closed = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<void>();

  isDragging = false;
  files: File[] = [];

  bidService = inject(BidService)

  close(): void {
    this.isOpen = false;
    this.files = [];
    this.closed.emit();
  }

  confirm(): void {
    if (this.files.length <= 0) return;

    const formData = new FormData();
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
      complete: () => {}
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
