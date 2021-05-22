import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { observable } from 'rxjs';
import { CollectionService } from '../../../Service/Collection/collection.service';

export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.scss']
})
export class CreateCollectionComponent implements OnInit {
  constructor(public creCollection: MatDialogRef<CreateCollectionComponent>,
    public collectionService: CollectionService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  collectionname = '';
  userID = '';
  token = '';
  dataCollection: [];
  // mockApi
  // onCreateClick(): void{
  //   this.http.post<any>('https://605c03e16d85de00170d922a.mockapi.io/mylibrary/collection',
  //     {name: this.collectionname}).subscribe(data => {
  //   });
  //   this.creCollection.close();
  //
  // }


  ngOnInit(): void {
    this.userID = localStorage.getItem('userid');
    this.token = localStorage.getItem('access_token');
    console.log('get userID ', this.userID);
  }

  getListCollection(): void {
    this.collectionService.getCollection(this.userID).subscribe((collection) => {
      console.log('getList', collection);
      this.dataCollection = collection.Data.ListColecttion;

      // this.dataCollection = [...this.dataCollection];
      // this.ChangeDetectorRef.detectChanges();
    });
  }

  onCancelClick(): void {
    this.creCollection.close();
  }

  // API
  onCreateClick(): void {
    this.collectionService.postCollection(
      { name: this.collectionname, UserID: this.userID }).subscribe(data => { });
    console.log("name", this.collectionname);
    this.creCollection.close();
    this.getListCollection();
  }




}
