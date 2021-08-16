import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private route: Router){

  }
  canActivate(){
    if (this.authService.loggedIn()){      
      return true
    }
    else {
      this.route.navigate(['/auth/login'])
  
      
      return false
    }
  }

}
