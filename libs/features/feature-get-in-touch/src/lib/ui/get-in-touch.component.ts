import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { send } from '@emailjs/browser';
import { from } from 'rxjs';
import { PUBLIC_KEY, SERVICE_KEY, TEMPLATE_KEY } from '../mocks/keys-injector';

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

  constructor(
    @Inject(PUBLIC_KEY) private readonly publicKey: string,
    @Inject(SERVICE_KEY) private readonly serviceKey: string,
    @Inject(TEMPLATE_KEY) private readonly templateKey: string,
  ) {}

  sendEmail(event: Event) {
    event.preventDefault();

    if (!this.getValidEmail()) return;

    from(
      send(this.serviceKey, this.templateKey, this.emailForm.getRawValue(), {
        publicKey: this.publicKey,
      }),
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
