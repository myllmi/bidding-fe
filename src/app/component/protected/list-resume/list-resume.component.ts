import {Component, inject, OnDestroy} from '@angular/core';
import {DynamicTableComponent} from '../../infra/dynamic-table/dynamic-table.component';
import {UploadResumeComponent} from './upload-resume/upload-resume.component';
import {SpinnerComponent} from '../../infra/spinner/spinner.component';
import {ResumeService} from '../../../service/resume.service';
import {I18nService} from '../../../service/i18n.service';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-list-resume',
  imports: [
    DynamicTableComponent,
    UploadResumeComponent,
    SpinnerComponent,
    TranslatePipe
  ],
  templateUrl: './list-resume.component.html',
  styleUrl: './list-resume.component.css',
})
export class ListResumeComponent {

  i18n = inject(I18nService)

  arrResume: Array<any> = []
  arrColumns: Array<any> = []

  constructor() {
    const lang = navigator.language;
    if (lang.startsWith('pt')) {
      this.i18n.setLanguage(lang === 'pt-BR' ? 'pt-BR' : 'pt-PT');
    } else {
      this.i18n.setLanguage('en');
    }
    this.fetchResume(true);
    this.i18n.getTranslation('candidate.name').subscribe(result => {
      this.arrColumns.push({key: 'name_professional', label: result, sortable: true})
    })
    this.i18n.getTranslation('candidate.profile').subscribe(result => {
      this.arrColumns.push({key: 'position', label: result, sortable: true})
    })
  }

  isUploadOpen = false;

  openUpload() {
    this.isUploadOpen = true;
  }

  onConfirmUpload() {
    this.isUploadOpen = false;
    this.fetchResume(true);
  }

  // Spinner Config
  isLoading = false;

  toggleLoading() {
    this.isLoading = !this.isLoading;
  }

  // Resume Service
  resumeService = inject(ResumeService)

  fetchResume(toggle: boolean = false) {
    if (toggle) {
      this.toggleLoading();
    }
    this.resumeService.getAllResume().subscribe({
      next: res => {
        this.arrResume = res;
        if (toggle) {
          this.toggleLoading();
        }
      },
      error: err => {
      },
      complete: () => {
      }
    });
  }
}
