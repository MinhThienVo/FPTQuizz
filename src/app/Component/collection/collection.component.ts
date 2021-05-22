import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCollectionComponent } from '../my-library/create-collection/create-collection.component';
import { CollectionService } from '../../Service/Collection/collection.service';
import { EditCollectionComponent } from '../my-library/edit-collection/edit-collection.component';
import { DeleteCollectionComponent } from '../my-library/delete-collection/delete-collection.component';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public myCollection: CollectionService
  ) {}

  public dataCollection: any[];
  userid = localStorage.getItem('userid');

  ngOnInit(): void {
    this.getListCollection();
  }

  getListCollection(): void {
    this.myCollection.getCollection(this.userid).subscribe((coll) => {
      this.dataCollection = coll.Data.ListColecttion;
      console.log('listCollection', this.dataCollection);
    });
  }

  create_collection(): void {
    const creCollection = this.dialog.open(CreateCollectionComponent, {
      width: '500px',
      data: { userID: this.userid },
    });
    creCollection.afterClosed().subscribe((result) => {
      location.reload();
    });
  }

  edit_collection(collectionID, e): void {
    console.log('Lay ID cua Collection', collectionID);
    const editCollection = this.dialog.open(EditCollectionComponent, {
      width: '500px',
      data: { collectionID },
    });
    e.stopPropagation();
    editCollection.afterClosed().subscribe((result) => {
      location.reload();
    });
  }

  delete_collection(collectionID, e): void {
    console.log('ID', collectionID);
    const delCollection = this.dialog.open(DeleteCollectionComponent, {
      width: '500px',
      data: { collectionID },
    });
    e.stopPropagation();
    delCollection.afterClosed().subscribe((result) => {
      location.reload();
    });
  }
}
