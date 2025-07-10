import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsService } from 'src/app/services/news/news.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  providers: [NewsService]
})
export class NewsComponent implements OnInit{

  constructor(private newsService: NewsService,
     private titleService: Title
  ) { }
    searchTerm = '';
    isLoading = false;
    errorMessage = '';
  
    newsTitle = '';
    newsDescription = '';
  

  
    currentPage: number = 0;
    pageSize: number = 12;
    totalPages: number = 0;
    totalItems: number = 0;
  
  
    newsItems: any[] = [];
    ngOnInit(): void {
      this.loadNews(this.currentPage);
    }
    loadNews(page: number): void {
      this.newsService.getAllNews(page, this.pageSize).subscribe({
        next: (res: any) => {
          this.newsItems = res.data.content;
          this.currentPage = page;
          this.totalPages = res.data.totalPages;
          this.totalItems = res.data.totalItems;
        },
        error: (err) => {
          console.error('Failed to load news', err);
        }
      });
    }
  
    goToPage(page: number): void {
      if (page >= 0 && page < this.totalPages) {
        this.loadNews(page);
      }
    }
  
    nextPage(): void {
      this.goToPage(this.currentPage + 1);
    }
  
    prevPage(): void {
      this.goToPage(this.currentPage - 1);
    }
  
   
  }