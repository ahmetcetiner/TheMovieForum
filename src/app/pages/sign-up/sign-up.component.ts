import { Message } from 'src/app/model/message';
import { UserService } from 'src/app/services/user-service/user.service';
import { AvatarService } from './../../services/avatar-service/avatar.service';
import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie-service/movie.service';
import { BACKDROP_SIZE, IMAGE_BASE_URL } from 'src/config';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { User } from 'src/app/model/users';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { ResponseMessage } from 'src/app/model/responseMessage';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  constructor(
    private movieService: MovieService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private avatarService: AvatarService,
    private userService: UserService
  ) {}

  registerForm: FormGroup;
  registerUser: any = {};

  imagePath: string;
  resultIndex: number = Math.floor(Math.random() * 20);
  userName : string
  eMail : string
  responseMessageUserName: ResponseMessage;
  responseMessageEmail: ResponseMessage;

  ngOnInit() {
    this.createRegisterForm();
    this.movieService.getBackdropImage().subscribe((data) => {
      this.imagePath =
        IMAGE_BASE_URL +
        BACKDROP_SIZE +
        data.results[this.resultIndex].backdrop_path;
    });
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group(
      {
        UserName: ['', Validators.required],
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        Email: ['', Validators.required],
        AvatarUrl: [''],
        Password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('Password').value === g.get('confirmPassword').value
      ? null
      : { mismatch: true };
  }

  register() {
    if (this.registerForm.valid) {
      let firstName = this.registerForm.controls['FirstName'].value;
      let lastName = this.registerForm.controls['LastName'].value;

      this.registerForm.controls['AvatarUrl'].setValue(
        this.avatarService.setAvatarUrl(firstName, lastName)
      );

      this.registerUser = Object.assign({}, this.registerForm.value);
      console.log(this.registerUser);
      this.authService.register(this.registerUser);
    }
  }

  checkUserName() {
   // this.userName = this.registerForm.controls['UserName'].value;
    this.userService.verifyUserName(this.userName).subscribe((data) => {
      this.responseMessageUserName = data;
      console.log(data)
    });
  }

  checkEmail() {
  //  this.eMail = this.registerForm.controls['Email'].value;
    this.userService.verifyEmail(this.eMail).subscribe((data) => {
      this.responseMessageEmail = data;
      console.log(data)
    });
  }
}
