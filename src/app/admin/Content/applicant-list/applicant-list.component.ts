import { Component, OnInit } from '@angular/core';
import { CareerService } from 'src/app/services/career/career.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.scss']
})
export class ApplicantListComponent implements OnInit{

  constructor(
    private applicantService: CareerService
  ){}

  ngOnInit(): void {
    this.getAllApplications(); 
  }


  applicants: any[] = [];

  getAllApplications() {
    this.applicantService.getAllApplications().subscribe({
      next: (data: any) => {
        this.applicants = data;
      },
      error: (err) => {
        console.error('Error fetching applications:', err);
      }
    });
  }

  
  downloadResume(resumePath: string) {
    const fileName = resumePath.split('/').pop(); // Extract the filename from the path
    if (!fileName) return;

    this.applicantService.downloadResume(fileName).subscribe(blob => {
      saveAs(blob, fileName);
    }, error => {
      console.error('Resume download failed', error);
    });
  }

 
  deleteApplicant(id: number) {
    if (confirm('Are you sure you want to delete this application?')) {
      this.applicantService.deleteApplication(id).subscribe({
        next: () => {
          this.applicants = this.applicants.filter(a => a.id !== id);
          alert('Application deleted successfully.');
        },
        error: (err) => {
          console.error('Error deleting application:', err);
          alert('Failed to delete application.');
        }
      });
    }
  }
 

}
