import { Component, OnInit } from "@angular/core";
import Axios from 'axios';
import { NullAstVisitor } from '@angular/compiler';

@Component({
  selector: "showData",
  styleUrls: ["./showData.component.scss"],
  templateUrl: "./showData.component.html",
})
export class showDataComponent implements OnInit {
  public data: any;
  public root_url: any;
  public root_method: any;
  public arrFile: any;
  public arrFileJson: any;
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

    this.root_url = 'http://localhost:5000/getData';
    this.root_method = 'GET';
  }
    getTable() {
    Axios({
        method: this.root_method,
        url: this.root_url,
        params: {
          userId: 'e9SCewrxTm',
        }
    }).then(res => {
        console.log(res);
        // this.arrFileJson = JSON.parse(res.data);
        this.arrFile = res.data;
        
    }).catch(err => {
        console.log(err);
    });
}
  
}