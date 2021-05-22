import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CollectionService } from '../../../Service/Collection/collection.service';

@Component({
  selector: 'app-delete-collection',
  templateUrl: './delete-collection.component.html',
  styleUrls: ['./delete-collection.component.scss']
})
export class DeleteCollectionComponent implements OnInit {
  name: any;
  collection = { ID: "", name: "", UserID: "", };
  userID: any;
  dataCollection: [];
  constructor(public delCollection: MatDialogRef<DeleteCollectionComponent>,
    public myCollection: CollectionService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log('Get ID Collection', this.data.collectionID);
    this.userID = localStorage.getItem('userid');
    this.myCollection.getCollectionById(this.data.collectionID).subscribe(collect => {
      this.collection = collect.Data.Colection;
      console.log('delete aaa 2 ', this.collection);
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
    this.delCollection.close();
  }

  onDeleteClick(id): void {
    console.log('Da xoa collection co ID la ' + this.collection.ID);
    this.myCollection.deleteCollection(this.collection.ID).subscribe(data => { });
    this.delCollection.close();
    this.getListCollection();
  }
}
