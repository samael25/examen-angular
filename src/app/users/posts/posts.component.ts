import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { UsuariosService } from '../../services/usuarios.service';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  formUser: FormGroup;
  private subscription$: Subscription = new Subscription();
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['title', 'body', 'detail'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private readonly usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.formUser = new FormGroup({
      id: new FormControl(null, [
        Validators.required,
        Validators.max(10),
        Validators.min(1),
      ]),
    });
  }

  getPostsByUserId(): void {
    if (this.formUser.valid) {
      const formUser = this.formUser.getRawValue();
      this.subscription$.add(
        this.usuariosService.findPostsByUserId(formUser.id).subscribe((res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      );
    }
  }

  detailPost(row: any) {
    this.dialog
      .open(CommentsComponent, {
        data: {
          IdPost: row.id,
        },
        disableClose: true,
      })
      .afterClosed()
      .subscribe((result) => {});
  }

  get form() {
    return this.formUser.controls;
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}

