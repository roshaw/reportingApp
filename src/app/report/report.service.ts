import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private http: HttpClient
  ) { }

  getReports() {
    return this.http.get('someApiURL/report/list');
  }

  getSingleReport(id: number) {
    return this.http.get('someApiURL/report/single/' + id);
  }
}
