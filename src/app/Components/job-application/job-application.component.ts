import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CareerService } from 'src/app/services/career/career.service';


@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.scss']
})
export class JobApplicationComponent implements OnInit {

  position: any = {
    id: 0,    
    title: ''
  };

  applicationData: any=
  {
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    location: '',
    currentLocation: '',
    educationQualification: '',
    employmentStatus: '',
    workExperience: '',
    position: '',
    jobId: this.position.id,
    jobTitle: this.position.title
  };
  jobId: number | null = null; 
  

  selectedFile: File | null = null;
  fileError: string = '';
  isSubmitting: boolean = false;
  isSuccess: boolean = false;
  errorMessage: string = '';
  formSubmitted: boolean = false;

  constructor(
    private jobService: CareerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const jobIdParam = this.route.snapshot.paramMap.get('id');
  
    if (jobIdParam !== null) {
      const jobId = Number(jobIdParam);
  
      if (!isNaN(jobId)) {
        this.jobService.getCareerById(jobId).subscribe(job => {
          this.position = job;
        });
      } else {
        console.error('Invalid job ID:', jobIdParam);
      }
    } else {
      console.error('Job ID param is missing in route');
    }
  }


  onFileSelected(event: any): void {
    const file: File = event.target.files?.[0];
    if (!file) return;
  
    console.log('✅ File selected:', file.name, file.type, file.size);
  
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
  
    if (!allowedTypes.includes(file.type)) {
      this.fileError = 'Invalid file type. Please upload a PDF or Word document.';
      this.selectedFile = null;
      return;
    }
  
    if (file.size > 5 * 1024 * 1024) {
      this.fileError = 'File size exceeds 5MB limit.';
      this.selectedFile = null;
      return;
    }
  
    this.selectedFile = file;
    this.fileError = '';
  }

  onSubmit(): void {
    if (!this.selectedFile) {
      this.fileError = 'Please upload your resume before submitting.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.isSuccess = false;

    const formData = new FormData();

    const applicationPayload = {
      ...this.applicationData,
      jobId: this.position.id,
      jobTitle: this.position.title
    };

    // 🟢 Backend expects "application" as JSON string
    const applicationBlob = new Blob(
      [JSON.stringify(applicationPayload)],
      { type: 'application/json' }
    );

    formData.append('application', applicationBlob);
    formData.append('resume', this.selectedFile); // 🟢 "resume" as file part

    this.jobService.submitApplication(formData).subscribe({
      next: (response) => {
        this.isSuccess = true;
        this.isSubmitting = false;

        // Reset the form
        this.applicationData = {
          fullName: '',
          email: '',
          phone: '',
          gender: '',
          location: '',
          currentLocation: '',
          educationQualification: '',
          employmentStatus: '',
          workExperience: '',
          position: '',
          jobId: this.position.id,
          jobTitle: this.position.title
        };
        this.selectedFile = null;
      },
      error: () => {
        this.errorMessage = 'Failed to submit application. Please try again later.';
        this.isSubmitting = false;
      }
    });
  }

}
