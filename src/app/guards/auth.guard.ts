import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AppState } from '../store/app.state';
import { selectIsAuthenticated } from '../store/auth/auth.selectors';
import { loadUserFromStorage } from '../store/auth/auth.actions';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<AppState>);
  const router = inject(Router);

  const userStr = localStorage.getItem('currentUser');
  if (userStr) {
    try {
      JSON.parse(userStr);
      store.dispatch(loadUserFromStorage());
    } catch (error) {
      localStorage.removeItem('currentUser');
    }
  }

  return store.select(selectIsAuthenticated).pipe(
    take(1),
    switchMap(isAuthenticated => {
      if (isAuthenticated) {
        return of(true);
      }
      
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        try {
          JSON.parse(storedUser);
          store.dispatch(loadUserFromStorage());
          return store.select(selectIsAuthenticated).pipe(
            take(1),
            map(auth => {
              if (auth) {
                return true;
              }
              router.navigate(['/login']);
              return false;
            })
          );
        } catch (error) {
          localStorage.removeItem('currentUser');
        }
      }
      
      router.navigate(['/login']);
      return of(false);
    })
  );
};

