import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  contactsForm!: FormGroup;

  constructor(private fb: FormBuilder, private tostr: ToastrService) {}

  ngOnInit(): void {
    this.reactiveForm();
  }

  sendInfo() {
    if (this.contactsForm.invalid) {
      console.log('invalid');
    } else {
      this.tostr.success('data is send');
    }
  }

  reactiveForm() {
    this.contactsForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      phone: ['+35480979455318', [Validators.required, this.validatorUAphone]],
    });
  }

  validatorUAphone(control: AbstractControl) {
    // const regExp = /^+380d{3}d{2}d{2}d{2}$/;
    // console.log(control);
    // console.log(control.value.match('[/^+380d{3}d{2}d{2}d{2}$/]'));
    // const string = '+380979455318';
    // console.log(string.match('[/^+380d{3}d{2}d{2}d{2}$/]/g'));

    if (control.value.match('[/^+380d{3}d{2}d{2}d{2}$/]')) {
      return null;
    } else {
      return { invalidPhone: true };
    }
  }
}
