import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IPost } from 'src/app/shared/interfaces/post.interface';
import { RequestsService } from 'src/app/shared/services/requests.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  private readonly _destroy$: Subject<void> = new Subject<void>();

  postForm!: FormGroup;

  posts!: IPost[];
  constructor(
    private requestService: RequestsService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.reactiveForm();
    this.getPosts();
  }

  editPost(post: IPost) {
    this.postForm.patchValue({
      ...post,
    });
  }

  deletePost(postId: number) {
    const indexPost = this.posts?.findIndex((elem: IPost) => elem.id == postId);
    console.log(indexPost);
    this.posts.splice(indexPost, 1);

    this.toastr.success('post was deleted success');
  }

  saveEditedPost() {
    console.log('sdf');

    this.toastr.success('post was successfully saved');
  }

  addNewPost() {
    this.toastr.success('post was successfully added');
  }

  getPosts() {
    this.requestService
      .getPosts()
      .pipe(takeUntil(this._destroy$))
      .subscribe((res) => {
        console.log('posts');
        console.log(res.slice(0, 20));
        this.posts = res.slice(0, 20);
      });
  }

  reactiveForm() {
    this.postForm = this.fb.group({
      title: [''],
      body: [''],
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
