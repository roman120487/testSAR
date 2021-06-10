import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { ContactUsModule } from './pages/contact-us/contact-us.module';
import { GalleryModule } from './pages/gallery/gallery.module';
import { HomeModule } from './pages/home/home.module';
import { PostsModule } from './pages/posts/posts.module';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: () => HomeModule },
      { path: 'posts', loadChildren: () => PostsModule },
      { path: 'gallery', loadChildren: () => GalleryModule },
      { path: 'contuct_us', loadChildren: () => ContactUsModule },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
