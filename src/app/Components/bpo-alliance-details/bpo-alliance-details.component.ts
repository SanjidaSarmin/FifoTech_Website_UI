import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BPO_ALLIANCE_ITEMS, GridItem } from '../bpo-alliance/bpo-alliance.component';

@Component({
  selector: 'app-bpo-alliance-details',
  templateUrl: './bpo-alliance-details.component.html',
  styleUrls: ['./bpo-alliance-details.component.scss']
})
export class BpoAllianceDetailsComponent implements OnInit {
  item: GridItem | undefined;
  isLoading = true;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const itemId = params.get('id');
      if (itemId) {
        // Get the item from the static data
        this.item = this.getBpoAllianceItems().find(item => item.id === itemId);
      }
      this.isLoading = false;
    });
  }

  // Get BPO Alliance items from the shared constant
  private getBpoAllianceItems(): GridItem[] {
    return BPO_ALLIANCE_ITEMS;
  }

  getPublishedDate(id: string): Date {
    // Extract date from ID if possible, or use current date as fallback
    const dateMap: {[key: string]: string} = {
      'answernet-joins-gba': '2020-11-05',
      'gba-summit-2019': '2019-10-15',
      'daily-sun-nov-2020': '2020-11-06',
      'prothom-alo-nov-2020': '2020-11-09',
      'gba-press-release': '2020-11-05',
      'ittefaq-nov-2020': '2020-11-08',
      'bangla-tribune-nov-2020': '2020-11-05',
      'jugantor-nov-2020': '2020-11-05',
      'risingbd-nov-2020': '2020-11-05'
    };
    
    const dateStr = dateMap[id] || new Date().toISOString().split('T')[0];
    return new Date(dateStr);
  }

  getGalleryImages(item: GridItem): string[] {
    return item.galleryImages || [];
  }

  getItemContent(id: string): string {
    // For GBA Summit 2019, we're handling the content in the template
    if (id === 'gba-summit-2019') {
      return '';
    }
    
    // Return the item's content from BPO_ALLIANCE_ITEMS, or a default message if not found
    return this.item?.content || '<p>Content not available.</p>';
  }

  goBack(): void {
    window.history.back();
  }
}
