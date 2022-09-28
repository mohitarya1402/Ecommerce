import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorServiceService {
  constructor() {}
  errorMessages = {
    UNKNOWN: 'An Unkown Error Is Occurred',
    EMAIL_EXIST: 'Email already exist,Try new Email',
    OPERATIO_NOTALLOWED: 'Operation is not allowed',
    TOO_MANY_ATTEMPTS_TRY_LATER: 'Too many attempts try later',
    EMAIL_NOT_FOUND: 'Email not found,Please Enter correct Email',
    INVALID_PASSWORD: 'Wrong password,Please enter correct password',
    USER_DISABLED: 'User is disabled',
  };
}
