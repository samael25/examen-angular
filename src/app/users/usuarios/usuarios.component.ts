import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { UserVM } from './userVM.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit, OnDestroy {
  private subscription$: Subscription = new Subscription();
  dataSource: MatTableDataSource<UserVM>;
  displayedColumns: string[] = ['name', 'username', 'phone'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private usuariosService: UsuariosService
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.subscription$.add(
      this.usuariosService.findAllUsers().subscribe((res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}

