import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { LayoutComponent } from '../../../shared/components/layout/layout.component';
import { BLOG_ARTICLES, BlogArticle } from '../blog.data';

@Component({
  selector: 'app-blog-article-page',
  standalone: true,
  imports: [LayoutComponent, RouterLink],
  templateUrl: './blog-article-page.component.html',
  styleUrl: './blog-article-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogArticlePageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private titleService = inject(Title);
  private meta = inject(Meta);
  private document = inject(DOCUMENT);

  article!: BlogArticle;
  related: BlogArticle[] = [];
  formattedDate = '';

  private formatDate(isoDate: string): string {
    const months = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
    const [y, m, d] = isoDate.split('-').map(Number);
    return `${d} ${months[m - 1]} ${y}`;
  }

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    const found = BLOG_ARTICLES.find(a => a.slug === slug);

    if (!found) {
      this.router.navigate(['/blog']);
      return;
    }

    this.article = found;
    this.formattedDate = this.formatDate(found.date);
    this.related = BLOG_ARTICLES.filter(a => a.slug !== slug).slice(0, 3);

    this.titleService.setTitle(found.metaTitle);
    this.meta.updateTag({ name: 'description', content: found.metaDescription });
    this.meta.updateTag({ property: 'og:title', content: found.metaTitle });
    this.meta.updateTag({ property: 'og:description', content: found.metaDescription });
    this.meta.updateTag({ property: 'og:image', content: `https://brussels-shuttle.be/${found.image}` });

    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', `https://brussels-shuttle.be/blog/${found.slug}`);
  }
}
