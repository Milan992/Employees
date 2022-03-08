import { Component, OnInit } from '@angular/core';
import { WorkingDay } from './models/workingDay.model';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  data!: WorkingDay[];
  employees: WorkingDay[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    //get data
    this.dataService.getData().then(result => {
      this.data = result;

      // group data by EmployeeName
      this.data.map((d: WorkingDay) => {
        let employee = this.employees.find(e => e.EmployeeName == d.EmployeeName);
        if (employee == null) {
          d.SecondsWorking = (Date.parse(d.EndTimeUtc) - Date.parse(d.StarTimeUtc));
          this.employees.push(d);
        } else {
          employee.SecondsWorking = employee.SecondsWorking + (Date.parse(d.EndTimeUtc) - Date.parse(d.StarTimeUtc));
        }

        // Order data by the totaltime worked.
        this.employees.sort(function (a, b) {
          return b.SecondsWorking - a.SecondsWorking;
        });
      })
    })
  }
}
