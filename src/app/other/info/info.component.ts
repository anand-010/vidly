import {Component, ElementRef, OnInit} from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
  animations: [
    trigger('panelInOut', [
      transition('void => *', [
        style({
          opacity: 1,
        }),
        animate(800),
      ]),
      transition('* => void', [
        animate(
          800,
          style({
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class InfoComponent implements OnInit {
  step: any;
  image: string;
  imageSrc: any;
  profileForm: FormGroup;
  packageForm: FormGroup;
  paymentForm: FormGroup;
  completeForm: FormGroup;
  profilePic: File;
  // tslint:disable-next-line:variable-name
  cmpny_purpose = [
    'Ott platform',
    'Video cource',
    'Product demo',
    'Video sharing',
  ];
  validation_messages = {
    cmpname: [
      { type: 'required', message: 'Company name is required' },
      { type: 'minlength', message: 'name must be min 3 charaters required' },
      {
        type: 'maxlength',
        message: 'Company name length is limited to 15 charaters',
      },
    ],
    cmploc: [
      { type: 'required', message: 'Company location is required' },
      {
        type: 'minlength',
        message: 'location must be min 3 charaters required',
      },
      {
        type: 'maxlength',
        message: 'Company location length is limited to 15 charaters',
      },
    ],
    sector: [{ type: 'required', message: 'Please select or Enter a sector' }],
    website: [
      { type: 'required', message: 'Please insert your website url' },
      { type: 'pattern', message: 'Enter a valid website url' },
    ],
  };
  formNames = ['profileForm', 'packageForm', 'paymentForm'];
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private el: ElementRef
  ) {
    this.step = 1;
    this.image = 'assets/img/profile.jpg';
  }

  ngOnInit(): void {
    this.createForms();
    this.packageForm.valueChanges.subscribe((observer) => {
      console.log(
        'val changes',
        observer,
        this.completeForm.get('packageForm').valid,
        this.packageForm.valid
      );
    });
  }
  incStep() {
    this.step = this.step + 1;
  }
  decStep() {
    this.step = this.step - 1;
  }
  readURL(event: HTMLInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);

      reader.readAsDataURL(file);
    }
  }
  createForms() {
    this.profileForm = this.fb.group({
      profilePic: ['', Validators.required],
      cmpname: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ])
      ),
      cmploc: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ])
      ),
      sector: ['', Validators.required],
      website: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            '^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$'
          ),
        ])
      ),
    });
    this.packageForm = this.fb.group({
      package: [''],
    });
    this.paymentForm = this.fb.group({
      cardNumber: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      cardExp: new FormControl('', Validators.compose([Validators.required])),
      cvv: new FormControl('', Validators.compose([Validators.required])),
      holderName: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
    });
    this.completeForm = this.fb.group({
      profileForm: this.profileForm,
      packageForm: this.packageForm,
      paymentForm: this.paymentForm,
    });
  }

  logForm() {
    console.log('val from form group', this.profileForm.value);
    console.log('cal from package', this.packageForm.value);
    console.log('cal from payment', this.paymentForm.value);
    console.log('complete form', this.completeForm.value);
    console.log(
      this.completeForm.get('paymentForm').valid,
      this.paymentForm.valid
    );
    console.log(this.paymentForm);
  }
  fileChange(event){
    this.profilePic = event.target.files[0];
    console.log('event is', this.profilePic);
  }
  submittoServer() {
    if (this.completeForm.valid) {
      // locate the file element meant for the file upload.
      const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
      console.log('form sub to serv', inputEl);
      const formData = new FormData();
      if (this.profilePic){
        formData.append('photo', this.profilePic, this.profilePic.name);
      }
      formData.append('data', JSON.stringify(this.completeForm.value));
      this.http
        .post('http://localhost/info', formData, {
          withCredentials: true,
        })
        .subscribe(
          (response: any) => {
            console.log(response);
            if (response.flag) {
              this.router.navigate(['/dashboard/home']);
            } else {
              if (response.error){
                alert('Sorry some error on our server Try again later');
              }
              else {
                alert('Info already present on server');
                this.router.navigate(['/dashboard/home']);
              }
            }
          },
          (error) => console.log(error)
        );
    }
  }
}
interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
