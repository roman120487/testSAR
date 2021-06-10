import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { RequestsService } from 'src/app/shared/services/requests.service';
import { take, takeUntil } from 'rxjs/operators';
import { IPhoto } from 'src/app/shared/interfaces/photo.interface';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  private readonly _destroy$: Subject<void> = new Subject<void>();

  photos?: IPhoto[];
  constructor(private requestService: RequestsService) {}

  ngOnInit(): void {
    this.getPhotos();
  }

  getPhotos() {
    this.requestService
      .getPhotos()
      .pipe(takeUntil(this._destroy$))
      .subscribe(
        (res) => {
          this.photos = res.slice(0, 20);
        },
        (err: any) => console.log(err)
      );
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
