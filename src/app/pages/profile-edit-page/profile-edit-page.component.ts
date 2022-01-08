import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/users';

@Component({
  selector: 'app-profile-edit-page',
  templateUrl: './profile-edit-page.component.html',
  styleUrls: ['./profile-edit-page.component.scss']
})
export class ProfileEditPageComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  profileEditForm: FormGroup;
  editUser: User = new User();

  ngOnInit(): void {
  }

  createProfileEditForm() {
    this.profileEditForm = this.formBuilder.group(
      {
        UserName: ["", Validators.required],
        FirstName: ["", Validators.required],
        LastName: ["", Validators.required],
        Email: ["", Validators.required],
        AvatarUrl: [""],
        Password: ["", [Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8)]],
        confirmPassword: ["", Validators.required]
      },
      { validator: this.passwordMatchValidator }
    )
  }

  setModel() {
    this.editUser.FirstName = this.profileEditForm.controls["FirstName"].value
    this.editUser.LastName = this.profileEditForm.controls["LastName"].value
    this.editUser.Email = this.profileEditForm.controls["Email"].value
    this.editUser.UserName = this.profileEditForm.controls["UserName"].value
    this.editUser.Password = this.profileEditForm.controls["Password"].value
    this.editUser.AvatarUrl = this.profileEditForm.controls["AvatarUrl"].value
    alert("mamut")
    console.log(this.editUser)
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('Password').value ===
      g.get('confirmPassword').value ? null : { mismatch: true }
  }
}
