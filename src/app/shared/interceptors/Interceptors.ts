import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor';
import { HeadersInterceptor } from './headers-interceptor';

export const interceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
]