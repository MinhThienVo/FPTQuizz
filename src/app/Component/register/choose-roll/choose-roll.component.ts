import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService} from 'src/app/Service/base.service'

@Component({
  selector: 'app-choose-roll',
  templateUrl: './choose-roll.component.html',
  styleUrls: ['./choose-roll.component.scss']
})
export class ChooseRollComponent implements OnInit {
   email:any
   roll:any
   role=""
  constructor(
    private route:ActivatedRoute,
    private baseService:BaseService
    ) {}
    ngOnInit(){
      this.roll = this.route.params.subscribe(params => {
        this.email = params['email'];
        });
        console.log(this.email);

  }

  emailLogin:any


  //truyen du lieu
  // ngOnInit(): void {
  //   this.baseService.getEmailLogin().subscribe(value=>{
  //     console.log(value);
  //     this.emailLogin = value;
  //   });


}
