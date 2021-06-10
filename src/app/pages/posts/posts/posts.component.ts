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
  indexEditedPost!: number;
  editPostBool = false;

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

  editPost(post: IPost, index: number) {
    this.editPostBool = true;
    this.indexEditedPost = index;
    this.postForm.patchValue({
      ...post,
    });
  }

  deletePost(postId: number) {
    const indexPost = this.posts?.findIndex((elem: IPost) => elem.id == postId);
    this.posts.splice(indexPost, 1);
    this.toastr.success('post was deleted success');
  }

  saveEditedPost() {
    const index = this.indexEditedPost;
    this.posts[index] = this.postForm.value;
    this.postForm.reset();
    this.editPostBool = false;
    this.toastr.success('post was successfully saved');
  }

  addNewPost() {
    this.posts.unshift(this.postForm.value);
    this.postForm.reset();
    this.toastr.success('post was successfully added');
  }

  getPosts() {
    this.requestService
      .getPosts()
      .pipe(takeUntil(this._destroy$))
      .subscribe(
        (res) => {
          console.log('posts');
          console.log(res.slice(0, 20));
          this.posts = res.slice(0, 20);
        },
        (err: any) => console.log(err)
      );
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
