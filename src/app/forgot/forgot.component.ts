import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
})
export class ForgotComponent {
  form = new FormGroup({
    email: new FormControl('', Validators.required),
  });
  constructor(private route: Router) {}
  onSubmit() {
    if (this.form.valid) {
      this.route.navigate(['/']);
    }
  }
}
