import { Injectable } from '@angular/core';
import { TranslateService, TranslateLoader, _ } from '@ngx-translate/core';
import {forkJoin, Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class I18nService {
  constructor(
    private translate: TranslateService,
    private loader: TranslateLoader
  ) {}

  setLanguage(lang: 'pt-BR' | 'pt-PT' | 'en') {
    if (!lang.startsWith('pt')) {
      this.translate.use(lang);
      return;
    }

    forkJoin({
      base: this.loader.getTranslation('pt'),
      region: this.loader.getTranslation(lang)
    }).subscribe(({ base, region }) => {
      this.translate.setTranslation(lang, {
        ...base,
        ...region
      });
      this.translate.use(lang);
    });
  }

  getTranslation(term: string): Observable<any> {
    return this.translate.get(_(term))
  }
}
