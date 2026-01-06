import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  switchMap,
  take,
  throwError
} from 'rxjs';
import {AuthService} from '../../../service/auth.service';
import {Router} from '@angular/router';

let isRefreshing = false;
const refreshSubject = new BehaviorSubject<string | null>(null);

const PUBLIC_ENDPOINTS = [
  '/iam/login',
  '/iam/refresh',
  '/iam/logout'
];

export const RefreshInterceptor: HttpInterceptorFn = (req, next) => {
  const http = inject(HttpClient);
  const auth = inject(AuthService);
  const router = inject(Router);

  if (PUBLIC_ENDPOINTS.some(url => req.url.includes(url))) {
    return next(req);
  }
  return next(req).pipe(
    catchError(err => {
      if (err.status !== 401) {
        return throwError(() => err);
      }

      if (!isRefreshing) {
        isRefreshing = true;
        refreshSubject.next(null);

        return http.post<any>(
          'http://localhost:8000/api/v1/iam/refresh',
          {},
          {withCredentials: true}
        ).pipe(
          switchMap(res => {
            isRefreshing = false;
            auth.setAccessToken(res.token);
            refreshSubject.next(res.token);

            return next(
              req.clone({
                setHeaders: {
                  Authorization: `Bearer ${res.token}`
                }
              })
            );
          }),
          catchError(refreshErr => {
            isRefreshing = false;
            auth.clear();
            router.navigate(['/login']).then()
            return throwError(() => refreshErr);
          })
        );
      }

      return refreshSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token =>
          next(
            req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            })
          )
        )
      );
    })
  );
};
