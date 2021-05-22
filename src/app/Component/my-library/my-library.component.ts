import { ChangeDetectorRef, Component, OnInit, Pipe } from '@angular/core';
import { MyLibraryService } from '../../Service/MyLibrary/my-library.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateCollectionComponent } from './create-collection/create-collection.component';
import { CollectionService } from '../../Service/Collection/collection.service';
import { EditCollectionComponent } from './edit-collection/edit-collection.component';
import { DeleteCollectionComponent } from './delete-collection/delete-collection.component';
import { ActivatedRoute } from '@angular/router';
import { AddToCollectionComponent } from './add-to-collection/add-to-collection.component';
import '@angular/platform-browser';

@Component({
  selector: 'app-my-library',
  templateUrl: './my-library.component.html',
  styleUrls: ['./my-library.component.scss'],
})
export class MyLibraryComponent implements OnInit {
  constructor(
    public myLibrary: MyLibraryService,
    public myCollection: CollectionService,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public ChangeDetectorRef: ChangeDetectorRef
  ) {}

  dataLibrary: any[];
  dataCollection: any[];
  userid = '';
  nameQuizz = '';
  spin = true;

  ngOnInit(): void {
    this.userid = localStorage.getItem('userid');
    this.getListCollection();
    this.getListQuizz();
  }

  hide() {
    return this.spin ? 'inline' : 'none';
  }

  getListQuizz(): void {
    this.myLibrary.getMyLibrary(this.userid).subscribe((listQuizz) => {
      this.spin = false;
      // let div = document.getElementById('spinner');
      console.log('quizz', listQuizz);
      this.dataLibrary = listQuizz.Data.ListQuestion;
      console.log(this.dataLibrary);
    });
  }

  getListCollection(): void {
    this.myCollection.getCollection(this.userid).subscribe((coll) => {
      this.dataCollection = coll.Data.ListColecttion;
      console.log('coll', this.dataCollection);
      this.dataCollection = [...this.dataCollection];
      this.ChangeDetectorRef.detectChanges();
    });
  }

  create_collection(): void {
    const creCollection = this.dialog.open(CreateCollectionComponent, {
      width: '500px',
      data: { userID: this.userid },
    });
    creCollection.afterClosed().subscribe((result) => {
      this.getListCollection();
    });
  }

  edit_collection(collectionID): void {
    console.log('ID', collectionID);
    const editCollection = this.dialog
      .open(EditCollectionComponent, {
        width: '500px',
        data: { collectionID },
      })
      .afterClosed()
      .subscribe((result) => {
        this.getListCollection();
      });
  }

  delete_collection(collectionID): void {
    console.log('ID', collectionID);
    const delCollection = this.dialog.open(DeleteCollectionComponent, {
      width: '500px',
      data: { collectionID },
    });
    delCollection.afterClosed().subscribe((result) => {
      console.log('deleted_collection');
      this.getListCollection();
    });
  }

  add_to_collection(quizz, e): void {
    console.log('Quizz ID', quizz);
    const addToCollection = this.dialog.open(AddToCollectionComponent, {
      width: '500px',
      data: { quizz },
    });
    e.stopPropagation();
    addToCollection.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }
}
