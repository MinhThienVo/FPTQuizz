import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CollectionService } from 'src/app/Service/Collection/collection.service';

@Component({
  selector: 'app-add-to-collection',
  templateUrl: './add-to-collection.component.html',
  styleUrls: ['./add-to-collection.component.scss'],
})
export class AddToCollectionComponent implements OnInit {
  [x: string]: any;

  newCollectionName = '';
  userID: any;
  public dataCollection: any[];
  quizzName = '';

  constructor(
    public addToCollection: MatDialogRef<AddToCollectionComponent>,
    public myCollection: CollectionService,
    public collectionService: CollectionService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.userID = localStorage.getItem('userid');
    console.log('get Data', this.data);
    this.quizzName = this.data.quizz.Name;
    this.getListCollection();
    console.log('getListCollection');
  }

  getListCollection(): void {
    this.myCollection.getCollection(this.userID).subscribe((collection) => {
      console.log('coll', collection);
      this.dataCollection = collection.Data.ListColecttion;

      this.dataCollection = [...this.dataCollection];
      // this.ChangeDetectorRef.detectChanges();
    });
  }

  onCancelClick() {
    this.addToCollection.close();
  }

  onCreateClick(newCollectName): void {
    this.collectionService
      .postCollection({ name: newCollectName, UserID: this.userID })
      .subscribe((data) => {});
    console.log('name', newCollectName);
    this.addToCollection.close();
    this.getListCollection();
  }
}
