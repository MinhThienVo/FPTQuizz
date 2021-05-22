import { Component, Inject, OnInit, Pipe } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CollectionService } from '../../../Service/Collection/collection.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.scss'],
})
export class EditCollectionComponent implements OnInit {
  name: any;
  idColl: any;
  collection: any = { ID: "", name: "", accountid: "", };
  dataCollection: [];
  constructor(
    public editCollection: MatDialogRef<EditCollectionComponent>,
    public myCollection: CollectionService,
    public http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'Bearer ' + localStorage.getItem('access_token'),
    }),
  };

  userID: any;

  ngOnInit(): void {
    console.log('aaaa', this.data.collectionID);
    this.idColl = this.data.collectionID;
    this.userID = localStorage.getItem('userid');
    this.myCollection.getCollectionById(this.idColl).subscribe((collect) => {
      this.collection = collect.Data.Colection;
      console.log('Edit Collection', this.collection);
      this.name = this.collection.name;
    });
  }

  getListCollection(): void {
    this.myCollection.getCollection(this.userID).subscribe((collection) => {
      console.log('coll', collection);
      this.dataCollection = collection.Data.ListColecttion;

      this.dataCollection = [...this.dataCollection];
      // this.ChangeDetectorRef.detectChanges();
    });
  }

  onCancelClick(): void {
    this.editCollection.close();
  }

  onUpdateClick(): void {
    var url = this.collection.ID + '&name=' + this.name;
    this.myCollection.editCollection(url,{ name: this.name }).subscribe((data) => {});
    this.editCollection.close();
    this.getListCollection();
  }
}
