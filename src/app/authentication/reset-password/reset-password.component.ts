import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../shared/services';
import { Password } from '../../shared/models';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  isSubmitting = false;
  sub: any;
  token: any;
  isSuccess = false;
  message: string;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _api: ApiService<Password>
  ) {
    this.resetForm = this._fb.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.sub = this._route.params.subscribe(params => {
      this.token = params['token'];
      console.log(this.token);
    });
  }

  resetPassword() {
    const body: Password = {
      password: this.resetForm.get('newPassword').value,
      token: this.token
    };

    this._api.post('forgot_password/change-password', body).subscribe(res => {
      if (res.status === 200) {
        this._router.navigate(['authentication/login']);
      }
    });

    console.log(body);
  }

}
