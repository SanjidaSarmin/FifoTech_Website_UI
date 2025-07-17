import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Modal } from 'bootstrap';
import { environment } from '../../../../environments/environment';
import { NewsService } from 'src/app/services/news/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();
  constructor(private newsService: NewsService,
    private router: Router
  ) { }
  searchQuery: string = '';

  isLoading = false;
  errorMessage = '';
  isModalOpen = false;
  isEditModalOpen = false;
  showModal = false;
  showEditModal = false;

  newsTitle = '';
  publishTime: string = '';
  newsDescription = '';
  newsCategory: string = '';
  newsLink: string = '';


  showDeleteModal = false;
  newsItemToDelete: number | null = null;

  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  showNotification: boolean = false;
  

  editingNews: any = {
    id: null,
    title: '',
    description: '',
    publishTime: '',
    category: '',
    newsLink: '',
    imagePreview: null
  };
  selectedEditImage: File | null = null;
  selectedImageFile: File | null = null;

  currentPage: number = 0;
  pageSize: number = 12;
  totalPages: number = 0;
  totalItems: number = 0;

  newsItems: any[] = []

  onImageSelected(event: any): void {
    this.selectedImageFile = event.target.files[0];
  }

  ngOnInit(): void {
    this.loadNews(this.currentPage);
    
    // Setup debounced search
    this.searchSubject.pipe(
      debounceTime(300), 
      distinctUntilChanged(), 
      takeUntil(this.destroy$)
    ).subscribe(searchQuery => {
      this.searchNews();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  loadNews(page: number = 0): void {
    if (this.searchQuery.trim()) {
      this.searchNews(page);
    } else {
      this.isLoading = true;
      this.newsService.getAllNews(page, this.pageSize).subscribe({
        next: (res: any) => {
          this.newsItems = res.data.content;
          this.currentPage = page;
          this.totalPages = res.data.totalPages;
          this.totalItems = res.data.totalItems;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching news:', error);
          this.isLoading = false;
        }
      });
    }
  }

  openModal(): void {
    this.isModalOpen = true;
    setTimeout(() => {
      this.showModal = true;
    }, 10);
    this.resetForm();
  }

  closeModal(): void {
    this.showModal = false;
    setTimeout(() => {
      this.isModalOpen = false;
    }, 300);
  }
  onSubmit(): void {
    if (!this.newsTitle || !this.newsDescription || !this.selectedImageFile) {
      console.error('Missing required fields');
      return;
    }
  
    const newsPayload = {
      title: this.newsTitle,
      publishTime: this.publishTime,
      description: this.newsDescription,
      category: this.newsCategory,
      newsLink: this.newsLink
    };
    
  
    const formData = new FormData();
    formData.append(
      'newsDetails', // ✅ Must match backend
      new Blob([JSON.stringify(newsPayload)], { type: 'application/json' })
    );
    formData.append('image', this.selectedImageFile);
  
    this.newsService.uploadNews(formData).subscribe({
      next: (res) => {
        this.showNotificationMessage('News created successfully', 'success');
        console.log('Successfully submitted', res);
        this.closeModal();
        this.resetForm();
        this.loadNews(this.currentPage);
      },
      error: (err) => {
        console.error('News creation failed:', err);
        console.error('Submission failed', err);
      }
    });
  }

  openEditModal(newsItem: any): void {
    this.editingNews = {
      id: newsItem.id,
      title: newsItem.title,
      description: newsItem.description,
      publishTime: newsItem.publishTime,
      category: newsItem.category,
      newsLink: newsItem.newsLink,
      imagePreview: newsItem.imageBase64
    };
    this.isEditModalOpen = true;
    setTimeout(() => {
      this.showEditModal = true;
    }, 10);
  }  

  closeEditModal(): void {
    this.showEditModal = false;
    setTimeout(() => {
      this.isEditModalOpen = false;
      this.editingNews = {
        id: null,
        title: '',
        description: '',
        publishTime: '',
        category: '',
        newsLink: '',
        imagePreview: null
      };
      this.selectedEditImage = null;
    }, 300);
  }

  
  onEditImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedEditImage = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.editingNews.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onEditSubmit(): void {
    if (!this.editingNews.title || !this.editingNews.description) {
      console.error('Title and description are required');
      return;
    }

    const formData = new FormData();
    formData.append('newsDetails', new Blob([JSON.stringify({
      title: this.editingNews.title,
      publishTime: this.editingNews.publishTime,
      description: this.editingNews.description,
      category: this.editingNews.category,
      newsLink: this.editingNews.newsLink
    })], { type: 'application/json' }));

    if (this.selectedEditImage) {
      formData.append('image', this.selectedEditImage);
    }

    this.newsService.updateNews(this.editingNews.id, formData).subscribe({
      next: (res) => {
        if (res.success) {
          console.log('News updated successfully', res.data);
          this.showNotificationMessage('News Updated successfully', 'success');
          this.closeEditModal();
          this.loadNews(this.currentPage);
        } else {
          console.error('Failed to update news:', res.message);
          this.showNotificationMessage('News Update failed', 'error');
        }
      },
      error: (err) => {
        console.error('Error updating news:', err);
      }
    });
  }


  resetForm(): void {
    this.newsTitle = '';
    this.publishTime = '';
    this.newsDescription = '';
    this.newsCategory = '';
    this.newsLink = '';
    this.selectedImageFile = null;
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

  openDeleteModal(id: number): void {
    this.newsItemToDelete = id;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.newsItemToDelete = null;
  }

  confirmDelete(): void {
    if (this.newsItemToDelete !== null) {
      this.newsService.deleteNews(this.newsItemToDelete).subscribe({
        next: () => {
          this.loadNews(this.currentPage);
          this.closeDeleteModal();
          this.showNotificationMessage('News item deleted successfully.','success');
        },
        error: (error) => {
          console.error('Error deleting news:', error);
          this.closeDeleteModal();
          this.showNotificationMessage('Failed to delete news item.','error');
        }
      });
    }
  }

  onSearch(): void {
    const trimmed = this.searchQuery.trim();
    this.currentPage = 0;
    this.searchSubject.next(trimmed);
  }
  

  searchNews(page: number = this.currentPage, title: string = this.searchQuery.trim()): void {
    if (title) {
      this.isLoading = true;
      this.newsService.searchNews(title, page, this.pageSize).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.newsItems = res.data.content;
            this.totalPages = res.data.totalPages;
            this.totalItems = res.data.totalItems;
            this.currentPage = page;
          }
          this.isLoading = false;
        },
        error: (err: any) => {
          console.error("Error searching news:", err);
          this.isLoading = false;
        }
      });
    } else {
      this.loadNews(page);
    }
  }

  navigateToNews(id: number) {
    this.router.navigate(['/admin/news-list', id]).then(() => {
      window.scrollTo(0, 0);
    });
  }

  showNotificationMessage(message: string, type: 'success' | 'error') {
    this.message = message;
    this.messageType = type;
    this.showNotification = true;
  
    setTimeout(() => {
      this.showNotification = false;
      this.message = '';
      this.messageType = '';
    }, 4000); // hides after 4 seconds
  }
  
}
