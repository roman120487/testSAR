import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPost } from '../interfaces/post.interface';
import { IPhoto } from '../interfaces/photo.interface';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  constructor(private http: HttpClient) {}

  public getPosts() {
    return this.http.get<IPost[]>(`${environment.apiUrl}/posts`);
  }

  public getPhotos() {
    return this.http.get<IPhoto[]>(`${environment.apiUrl}/photos`);
  }
}
