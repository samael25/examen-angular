import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { AlbumsComponent } from './albums/albums.component';
import { PostsComponent } from './posts/posts.component';
import { SharedModule } from '../_shared/shared.module';
import { CommentsComponent } from './comments/comments.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


@NgModule({
  declarations: [
    AlbumsComponent,
    PostsComponent,
    CommentsComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
  ],

})
export class UsersModule { }
