import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BackendService } from "../backend.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitting: Boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private backendService: BackendService
  ) {}

  ngOnInit() {
    // ???? initial form ????????????????
    this.registerForm = this.formBuilder.group({
      rank: ["", Validators.required],
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      id_mil: ["", Validators.required],
      unit_name: ["", Validators.required],
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  get f() {
    // ??????????????????
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitting = true;
    // ?????????????? register ???????? ????????????
    console.log(this.f.rank.value);

    if (!this.registerForm.invalid) {
      this.backendService
        .register(
          this.f.rank.value,
          this.f.first_name.value,
          this.f.last_name.value,
          this.f.id_mil.value,
          this.f.unit_name.value,
          this.f.username.value,
          this.f.password.value
        )
        .subscribe(data => {
          if (data) {
            if (data.status == true) {
              Swal.fire({
                type: "success",
                title: "??????",
                text: "register success!"
              });
              this.router.navigate(["/home"]);
            } else {
              console.log(data);

              Swal.fire({
                type: "error",
                title: "?????????",
                text: data.message
              });
            }
          }
          this.submitting = false;
        });
    } else {
      Swal.fire({
        type: "error",
        title: "?????????",
        text: "????????????????!"
      });

      this.submitting = false;
    }
  }
}
// ??????? Front-End
