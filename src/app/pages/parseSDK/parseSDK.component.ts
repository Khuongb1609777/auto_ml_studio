import { Component, OnInit } from "@angular/core";

@Component({
  selector: "parseSDK",
  styleUrls: ["./parseSDK.component.scss"],
  templateUrl: "./parseSDK.component.html",
})
export class ParseSDKComponent implements OnInit {
  public data: any;
  async ngOnInit() {
    try {
      const SimRobot = Parse.Object.extend("SimRobot");
      const query = new Parse.Query(SimRobot);
      const result = await query.find();
      if (result.length > 0) {
        this.data = "172.16.1.229";
      }
    } catch (err) {
      this.data = "rpa-iot-api";
    }
  }
}
