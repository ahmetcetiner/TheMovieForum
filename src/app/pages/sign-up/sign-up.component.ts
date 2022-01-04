import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { BACKDROP_SIZE, IMAGE_BASE_URL } from 'src/config';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { User } from 'src/app/model/users';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private movieService: MovieService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  registerForm : FormGroup;
  registerUser:any={}
 // model: User = new User();
  imagePath: string;
  resultIndex: number = Math.floor(Math.random() * 20);

  ngOnInit() {
    this.createRegisterForm()
    this.movieService.getBackdropImage().subscribe((data) => {
      this.imagePath =
        IMAGE_BASE_URL +
        BACKDROP_SIZE +
        data.results[this.resultIndex].backdrop_path;
    });
  }
  createRegisterForm(){
    this.registerForm = this.formBuilder.group(
      {
        UserName:["",Validators.required],
        FirstName:["",Validators.required],
        LastName:["",Validators.required],
        Email:["",Validators.required],
        AvatarUrl:["",Validators.required],
        Password:["",[Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8)]],
        confirmPassword:["",Validators.required]
      },
      {validator:this.passwordMatchValidator}
    )
  }

  passwordMatchValidator(g:FormGroup){
    return g.get('Password').value === 
    g.get('confirmPassword').value?null:{mismatch:true}
  }

  register() {
    if(this.registerForm.valid){
      this.registerUser = Object.assign({},this.registerForm.value)
      this.authService.register(this.registerUser)
    }
  }
}
