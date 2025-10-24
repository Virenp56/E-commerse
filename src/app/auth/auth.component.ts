import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ECommerceService } from '../e-commerce.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  toggleForm: boolean = true;
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    user_type: new FormControl('buyer'),
  });

  constructor(
    private router: Router,
    private eCommerceService: ECommerceService,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      const data = {
        email: formData.email,
        password: formData.password,
        user_type: formData.user_type,
      };

      const authObservable = this.toggleForm
        ? this.eCommerceService.login(data)
        : this.eCommerceService.register(data);
      authObservable.subscribe({
        next: (res) => {
          console.log(
            this.toggleForm ? 'User logged in:' : 'User registered:',
            res
          );
          if (res.result) {
            this.toastr.success(res.message);
            localStorage.setItem('token', res.token);
            this.router.navigate(['/dashboard']);
          } else {
            this.toastr.error(res.message);
          }
        },
        error: (err) => console.error(err),
      });
    }
  }
}
