import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {AuthService} from "../services/auth.service";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authServ : AuthService,
              private router:Router) {}


  intercept(req: HttpRequest<any>,
            next: HttpHandler):

    Observable<HttpEvent<any>> {

    if(req.headers.get("No-Auth") === "True"){
      return next.handle(req.clone());
    }
    const token = this.authServ.getToken();
    const request = this.addToken(req,token);
    return next.handle(request).pipe(
      catchError(
        (err:HttpErrorResponse)=>{
          console.log(err.status);
          if(err.status === 401){
            this.router.navigate(['/login']);
          } else if(err.status === 403){
            this.router.navigate(['/forbidden']);
          }
          return throwError("Some thing is wrong")
        }
      )
    );
  }

  private addToken(request:HttpRequest<any>,token:string){
    return request.clone(
      {
        setHeaders:{
          Authorization :  `Bearer ${token}`
        }
      }
    );
  }
}
