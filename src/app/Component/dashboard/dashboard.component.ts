import { Component, OnInit } from '@angular/core';
import { AuthenService } from 'src/app/Service/auth_login.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user={
    username:'',
  }

//     In=false;
//     Out=false;
   ngOnInit(): void {
//     this.authService.userInfo.subscribe(value=>{
//       if(value){
//         this.user.username=value.username;
//         this.In=true;
//       }
//       else{
//         this.Out=true;
//       }
//     })
//     this.authService.userInfo.subscribe(value=>{
//       if(value){
//     //    this.user.userid=value.userid;
//         this.user.username=value.username;
//         this.In=true;
//       }
//       else{
//         this.Out=true;
//       }
//     })

//   }
//   logout(){
//     localStorage.removeItem('access_token');
//   }
// showTodos(){
//   this.authService.getTodos()
//   .subscribe((value:any)=> {
//     this.totos=value;
//   })


}

}








