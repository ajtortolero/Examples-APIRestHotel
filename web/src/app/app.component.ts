import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Hotel } from './model/hotel/hotel';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public arrHotel: Hotel[];

  constructor(
    public pTranslateService: TranslateService,
    private pDataService: DataService
  ) {
    pTranslateService.addLangs(['en', 'es']);
    pTranslateService.setDefaultLang('en');

    const objBrowserLang = pTranslateService.getBrowserLang();
    pTranslateService.use(objBrowserLang.match(/en|es/) ? objBrowserLang : 'en');
  }

  ngOnInit() {
    this.pDataService.fnGetAll<Hotel[]>('GetAll').subscribe((data: Hotel[]) => this.arrHotel = data);
  }

  fnGetArray(pNumber: number): any[] {
    return Array(pNumber);
  }
}
