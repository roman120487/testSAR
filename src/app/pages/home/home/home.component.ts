import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IPhoto } from 'src/app/shared/interfaces/photo.interface';
import { IPost } from 'src/app/shared/interfaces/post.interface';
import { RequestsService } from 'src/app/shared/services/requests.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private readonly _destroy$: Subject<void> = new Subject<void>();
  photos!: IPhoto[];
  posts!: IPost[];
  constructor(private requestService: RequestsService) {}

  ngOnInit(): void {
    this.getPhotos();
    this.getPosts();
  }

  getPosts() {
    this.requestService
      .getPhotos()
      .pipe(takeUntil(this._destroy$))
      .subscribe(
        (res) => {
          this.photos = res.slice(0, 10);
        },
        (err: any) => console.log(err)
      );
  }

  getPhotos() {
    this.requestService
      .getPosts()
      .pipe(takeUntil(this._destroy$))
      .subscribe(
        (res) => {
          this.posts = res.slice(0, 10);
        },
        (err: any) => console.log(err)
      );
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
