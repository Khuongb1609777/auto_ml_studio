import { Component, OnInit } from "@angular/core";
import Axios from "axios";
import { NullAstVisitor } from "@angular/compiler";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "userRegister",
  styleUrls: ["./userRegister.component.scss"],
  templateUrl: "./userRegister.component.html",
})
export class userRegisterComponent implements OnInit {
  profileForm = new FormGroup({
    userName: new FormControl(""),
    password: new FormControl(""),
    email: new FormControl(""),
  });

  public data: any;
  public rootMethod: any;
  public rootUrl: any;
  public notificationRegister: any;
  public resultRegister: any;
  async ngOnInit() {
    try {
      const SimRobot = Parse.Object.extend("SimRobot");
      const query = new Parse.Query(SimRobot);
      const result = await query.find();
      if (result.length > 0) {
        this.data = "SHOW DATA PAGE";
      }
    } catch (err) {
      this.data = "rpa-iot-api";
    }
    this.rootMethod = "POST";
    this.rootUrl = "http://localhost:5000/Register";
  }
  onSubmit() {
    Axios({
      method: this.rootMethod,
      url: this.rootUrl,
      params: {
        userName: this.profileForm.value.userName,
        password: this.profileForm.value.password,
        email: this.profileForm.value.email,
      },
    })
      .then((res) => {
        console.log(res);
        this.resultRegister = res.data;
        console.log(this.resultRegister);
        //   this.notificationRegister['objectId'] ? console.log("ok") : console.log("fail")
        //   this.notificationRegister['objectId'] && console.log('a')
        if (this.resultRegister["objectId"]) {
          this.notificationRegister =
            "Create successfully: " + this.resultRegister["objectId"];
        } else {
          this.notificationRegister = this.resultRegister["error"];
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
