import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  constructor(private http: HttpClient) {}

  public getPosts() {
    return this.http.get<any>(`${environment.apiUrl}/posts`);
  }

  public getPhotos() {
    return this.http.get<any>(`${environment.apiUrl}/photos`);
  }
}
