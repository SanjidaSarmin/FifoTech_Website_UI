import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIResponse } from 'src/app/models/api-response.model';
import { NewsService } from 'src/app/services/news/news.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {
  newsItem: any;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService
  ) { }

  goBack(): void {
    this.router.navigate(['/admin/news-list']);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadNewsItem(+id);
    } else {
      this.error = 'No news ID provided';
      this.loading = false;
    }
  }

  private loadNewsItem(id: number): void {
    this.newsService.getNewsById(id).subscribe({
      next: (response: APIResponse<any>) => {
        if (response.success) {
          this.newsItem = response.data;
        } else {
          this.error = response.message || 'Failed to load news item';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading news item';
        this.loading = false;
        console.error('Error loading news item:', err);
      }
    });
  }

  formatDescription(desc: string): string {
    if (!desc) return '';
    // Split by double line breaks and wrap each in <p>
    return desc
      .split(/\n\s*\n/) // split on empty lines (paragraph breaks)
      .map(paragraph => `<p>${paragraph.trim()}</p>`)
      .join('');
  }
  
}
