import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { send } from '@emailjs/browser';
import { from } from 'rxjs';

@Component({
  selector: 'uf-get-in-touch',
  templateUrl: './get-in-touch.component.html',
  styleUrls: ['./get-in-touch.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class GetInTouchComponent {
  emailForm = new FormGroup({
    from_name: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    email: new FormControl<string>('', {
      validators: [Validators.required, Validators.email],
    }),
    message: new FormControl<string>(''),
  });

  sendEmail(event: Event) {
    event.preventDefault();

    if (!this.getValidEmail()) return;

    from(
      send(
        'service_8wpdhk7',
        'template_wtkdx6o',
        this.emailForm.getRawValue(),
        { publicKey: 'Mxk12hA0ZGLyWEAlk' },
      ),
    ).subscribe({
      next: () => {
        alert("E-mail sent successfully, I'll be in touch");
        this.emailForm.reset();
      },
      error: () => {
        alert('An error has occurred, please try again later');
      },
    });
  }

  getValidEmail() {
    if (this.emailForm.valid) return true;

    const controlKeys = Object.keys(this.emailForm.controls);

    for (const key of controlKeys) {
      const erros =
        this.emailForm.controls[key as keyof typeof this.emailForm.controls]
          .errors;

      if (!erros) continue;

      const errorKeys = Object.keys(erros);

      if (errorKeys[0] == 'required') {
        alert('Please fill in all the fields.');
        return false;
      }

      if (errorKeys[0] == 'email') {
        alert('Incorrect e-mail, please try another one.');
        return false;
      }
    }

    return false;
  }
}
