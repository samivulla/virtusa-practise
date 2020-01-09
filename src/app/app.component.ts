import { Component, OnInit } from '@angular/core';
import { CurdserviceService } from './service/curdservice.service';
import { map, startWith } from 'rxjs/operators';
import { combineLatest, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'practise';
  data$: Observable<any>;

  constructor(private translate: TranslateService, private http: HttpClient, private curdservive: CurdserviceService ) {
    translate.addLangs(['en', 'de', 'te']);
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    // this.getData();
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  // getData() {
  //   this.curdservive.getHeroes().subscribe(data => {
  //   });
  // }
}
