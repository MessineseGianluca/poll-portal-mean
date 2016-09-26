'use strict';

export default class LoginController {

  /*@ngInject*/
  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
  }

  login(form) {
    this.submitted = true;
    this.errors = {};
    if (form.$valid) {
      this.Auth.login({
          email: this.user.email,
          password: this.user.password
        })
        .then(() => {
          // Logged in, redirect to dashboard
          this.$state.go('dashboard');
        })
        .catch(err => {
          this.errors.login = err.message;
        });
    }
  }
}
