import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { send } from '@emailjs/browser';
import { from, Subject } from 'rxjs';
import { PUBLIC_KEY, SERVICE_KEY, TEMPLATE_KEY } from '../mocks/keys-injector';
import { MAX_EMAILS, STORAGE_KEY } from '../mocks/spam-mocks';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'uf-get-in-touch',
  templateUrl: './get-in-touch.component.html',
  styleUrls: ['./get-in-touch.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
})
export class GetInTouchComponent implements OnInit {
  emailForm = new FormGroup({
    from_name: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    email: new FormControl<string>('', {
      validators: [Validators.required, Validators.email],
    }),
    message: new FormControl<string>(''),
  });

  emailSent = 0;
  disabled$ = new Subject<boolean>();

  constructor(
    @Inject(PUBLIC_KEY) private readonly publicKey: string,
    @Inject(SERVICE_KEY) private readonly serviceKey: string,
    @Inject(TEMPLATE_KEY) private readonly templateKey: string,
  ) {}

  ngOnInit(): void {
    this.emailSent = +(localStorage.getItem(STORAGE_KEY) ?? '0');
  }

  sendEmail(event: Event) {
    event.preventDefault();

    if (!this.getValidEmail()) return;

    if (this.total > MAX_EMAILS) {
      alert(
        "Maximum emails per user sent, please wait! I'll get in touch back soon.",
      );
      return;
    }

    this.disabled$.next(true);

    from(
      send(this.serviceKey, this.templateKey, this.emailForm.getRawValue(), {
        publicKey: this.publicKey,
      }),
    ).subscribe({
      next: () => {
        alert("E-mail sent successfully, I'll be in touch");
        this.emailForm.reset();
        this.disabled$.next(false);
      },
      error: () => {
        alert('An error has occurred, please try again later');
        this.emailSent--;
        this.disabled$.next(false);
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

  get total() {
    this.emailSent++;
    localStorage.setItem(STORAGE_KEY, this.emailSent.toString());
    return this.emailSent;
  }
}
