import { AlertifyService } from './../../services/alertify-service/alertify.service';
import { idGetter } from 'src/app/app.module';
import { UserService } from 'src/app/services/user-service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseMessage } from 'src/app/model/responseMessage';
import { User } from 'src/app/model/users';
import { AvatarService } from 'src/app/services/avatar-service/avatar.service';

@Component({
  selector: 'app-profile-edit-page',
  templateUrl: './profile-edit-page.component.html',
  styleUrls: ['./profile-edit-page.component.scss'],
})
export class ProfileEditPageComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private avatarService: AvatarService,
    private userService: UserService,
    private alertifyService: AlertifyService
  ) {}
  userId = idGetter();
  profileEditForm: FormGroup;
  editUser: User = new User();
  userName: string;
  currentUser: User = new User();
  eMail: string;
  responseMessageUserName: ResponseMessage;
  responseMessageEmail: ResponseMessage;
  disableMessageUserName = true;
  disableMessageEmail = true;
  ngOnInit(): void {
    this.createProfileEditForm();
    this.setForm();
  }

  setForm() {
    this.userService.getUserById(this.userId).subscribe((data) => {
      this.profileEditForm.get('FirstName')?.setValue(data[0].FirstName);
      this.profileEditForm.get('LastName')?.setValue(data[0].LastName);
      this.profileEditForm.get('UserName')?.setValue(data[0].UserName);
      this.profileEditForm.get('Email')?.setValue(data[0].Email);
      this.profileEditForm.get('Password')?.setValue(data[0].Password);
      this.profileEditForm.get('confirmPassword')?.setValue(data[0].Password);

    });
  }

  createProfileEditForm() {
    this.profileEditForm = this.formBuilder.group(
      {
        Id :  [''],
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

  updateUser() {
    if (this.profileEditForm.valid){
      let firstName = this.profileEditForm.controls['FirstName'].value;
      let lastName = this.profileEditForm.controls['LastName'].value;

      this.profileEditForm.controls['AvatarUrl'].setValue(
        this.avatarService.setAvatarUrl(firstName, lastName)
      );

      this.profileEditForm.controls['Id'].setValue(this.userId);

      this.userService.getUserById(this.userId).subscribe(data=>{
  
        if(this.userName==data[0].UserName && this.eMail == data[0].Email){
          this.editUser = Object.assign({}, this.profileEditForm.value);
          console.log(this.editUser)
          this.userService.updateUser(this.editUser).subscribe(data=>{console.log(data)});
        }
        else{
          this.alertifyService.warning("Hatalı alanları değiştiriniz.")
        }
     })
    }
   
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('Password').value === g.get('confirmPassword').value
      ? null
      : { mismatch: true };
  }

  checkUserName() {
    this.userService.verifyUserName(this.userName).subscribe((data) => {
      this.checkCurrentUserName(data.isExist);
    });
  }

  checkEmail() {
    this.userService.verifyEmail(this.eMail).subscribe((data) => {
      console.log(data);
      this.checkCurrentEmail(data.isExist)
    });
    
  }

  checkCurrentUserName(isExist) {
    if (isExist) {
      this.userService.getUserById(this.userId).subscribe((data) => {
        console.log(this.userName);
        if (this.userName == data[0].UserName)
          this.disableMessageUserName = true;
          else
          this.disableMessageUserName=false
      });
    }
  }

  checkCurrentEmail(isExist) {
    if (isExist) {
      this.userService.getUserById(this.userId).subscribe((data) => {
        console.log(this.eMail);
        if (this.eMail == data[0].Email) this.disableMessageEmail = true;
        else this.disableMessageEmail = false;
      });
    }
  }
}
