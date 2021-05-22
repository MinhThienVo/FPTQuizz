import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { DataServiceService } from 'src/app/Service/data-service.service';
import { GetProfileService } from 'src/app/Service/SettingJoin/get-profile.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss'],
})
export class HomeAdminComponent implements OnInit {
  titleSearch = 'Quizizz library';
  classSelect = 'explore';
  hidden = 'hidden';
  useID = localStorage.getItem('userid');
  userName = '';
  editClass = -1;
  editStudent = -1;

  constructor(
    private _router: Router,
    private data: DataServiceService,
    private profile: GetProfileService
  ) {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.classSelect = event.url.split('/')[
          event.url.split('/').length - 1
        ];
        if (this.classSelect === 'admin') {
          this._router.navigate(['admin/explore']);
        }
      }
    });
    this.profile.getProfile(this.useID).subscribe((data) => {
      if (data.State === 1) {
        this.userName = data.Data.userInfor.Email.split('@')[0];
      }
    });
  }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(
      (editClass) => (this.editClass = editClass)
    );
    this.data.currentMessage.subscribe(
      (editStudent) => (this.editStudent = editStudent)
    );
  }

  onClick(event): void {
    this.titleSearch = event.path[0].childNodes[0].nodeValue;
  }

  changeClassLi(event): void {
    this.classSelect = event.srcElement.id;
  }

  hideItemMenu(): void {
    if (this.hidden === '') {
      this.hidden = 'hidden';
    } else {
      this.hidden = '';
    }
  }

  logout(): void {
    localStorage.clear();
  }

  turnOffEditClass(event): void {
    if (
      !(event.target.className === 'menu-btn') &&
      !(event.target.className === 'far fa-ellipsis-v')
    ) {
      this.data.changeMessage(-1);
    }
  }
}
