import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UsuariosService } from '../../services/usuarios.service';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments$: Observable<any[]>;
  constructor(
    private readonly usuariosService: UsuariosService,
    public dialogRef: MatDialogRef<CommentsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.comments$ = this.usuariosService.findCommentsByPostId(this.data.IdPost);
  }

  onClose() {
    this.dialogRef.close(false);
  }
}
