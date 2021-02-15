import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MoneyHttpInterceptor } from './money-http-interceptor';
import { AuthGuard } from './auth.guard';
import { environment } from 'src/environments/environment';

export function jwtTokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    SegurancaRoutingModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter,
        allowedDomains: ['https://wendelmoney-api.herokuapp.com'],
        disallowedRoutes: [`${environment.apiUrl}/oauth/token`]
      }
    })
  ],
  providers: [
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MoneyHttpInterceptor,
      multi: true
    },
    AuthGuard
  ],
  exports: [
  ]
})
export class SegurancaModule {}




