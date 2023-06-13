import { Injectable } from '@angular/core';
import { HttpApiService, HttpRequestMethod } from '../_shared/http';
import { UserVM } from '../users/usuarios/userVM.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  constructor(
    private httpApiService: HttpApiService
  ) {}

  findAllUsers() {
    return this.httpApiService.httpApi<UserVM[]>(
      HttpRequestMethod.GET,
      `users/`
    );
  }

  findAlbumsByUserId(id: number) {
    return this.httpApiService.httpApi<any[]>(
      HttpRequestMethod.GET,
      `user/${id}/albums`
    );
  }

  findPostsByUserId(id: number) {
    return this.httpApiService.httpApi<any[]>(
      HttpRequestMethod.GET,
      `user/${id}/posts`
    );
  }

  findCommentsByPostId(id: number) {
    return this.httpApiService.httpApi<any[]>(
      HttpRequestMethod.GET,
      `posts/${id}/comments`
    );
  }

}
