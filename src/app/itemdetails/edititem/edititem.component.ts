import { ValidationService } from '../../shared/validation.service';
//import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from "src/app/shared.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { BellItemList } from '../../shared/interfaces';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edititem',
  templateUrl: './edititem.component.html',
  styleUrls: ['./edititem.component.css']
})
export class EdititemComponent implements OnInit {

  customerForm: UntypedFormGroup = {} as UntypedFormGroup;
  get f(): { [key: string]: AbstractControl } {
    return this.customerForm.controls;
  }

  //item: any;
  item: BellItemList = {
    ITEMNAME: '',
    MRP: '',
    RATE: '',
    IMAGEURL: '',
    CATEGORY: '',
    TOTALITEMSINCARTON: '',
    TOTALITEMSINPACK: '',
    PACKINGTYPE: '',
    DESCRIPTION: ''
  };

  errorMessage = '';
  operationText: string = "Insert";
  deleteMessageEnabled: boolean = false;
  imagePath: string = "";
  imgURL: any;
  imageSrc: any;

  //visible = false;
  //dismissible = false;
  showSuccessAlert: boolean = false;
  //constructor(private router: Router, private route: ActivatedRoute,private service: SharedService) { }
  constructor(private router: Router,
    public route: ActivatedRoute, private service: SharedService, private formBuilder: UntypedFormBuilder
    ,private messageService: MessageService) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    if (id !== '0') {
      this.operationText = 'Update';
      this.getCustomer(id);
    }
    else {
      this.item.IMAGEURL = 'new.jpeg';
    }
    //this.getStates();
    this.buildForm();
  }
  getCustomer(id: string) {
    this.service.getItemDetailsByID(id)
      //.subscribe((item: ItemDetails) => {
      .subscribe((item: any) => {
        this.item = item;
        console.log(item);
        this.buildForm();
      },
        (err) => console.log(err));
  }  

  buildForm() {
    this.customerForm = this.formBuilder.group({
      ITEMNAME: [this.item.ITEMNAME, Validators.required],
      MRP: [this.item.MRP, Validators.required],
      RATE: [this.item.RATE, Validators.required],
      TOTALITEMSINCARTON: [this.item.TOTALITEMSINCARTON, Validators.required],
      //email: [this.item., [Validators.required, ValidationService.emailValidator]],
      PACKINGTYPE: [this.item.PACKINGTYPE, Validators.required],
      TOTALITEMSINPACK: [this.item.TOTALITEMSINPACK, Validators.required],
      CATEGORY: [this.item.CATEGORY, Validators.required],
      DESCRIPTION: [this.item.DESCRIPTION]
    });
  }

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';

  imageInfos?: Observable<any>;
  validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];

  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.preview = '';
        this.currentFile = file;

        const reader = new FileReader();
        //reader.onload = e => this.imageSrc = reader.result;
        this.imageSrc = URL.createObjectURL(event.target.files[0]);

        reader.onload = (e: any) => {
          //console.log(e.target.result);
          this.imageSrc = e.target.result;
          this.preview = e.target.result;
        };
        //alert(this.imageSrc);

        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  isValidFileExtension(file: any) :boolean {
    var fullpath = this.item.IMAGEURL;
    if (file) {
      var fileExt = "." + file.name.split('.').pop() ?? "";  //for only extension
      var sFileName = file.name.split('/').pop() ?? "";
      //alert(fileExt);
      //if (fileExt.length > 0) {
      var blnValid = false;
      //alert('count = ' +_validFileExtensions.length);
      for (var j = 0; j < this.validFileExtensions.length; j++) {
        var sCurExtension = this.validFileExtensions[j];
        //alert(fileExt + ' = ' + sCurExtension.toLowerCase());
        if (fileExt == sCurExtension.toLowerCase()) {
          //blnValid
          //break;
          return true;
        }
      }
    }
    return false;
  }
  //to upload image file with same exiting file name, so that no need to update in DB
  upload(): void {
      this.progress = 0;
      var filename: any;
      if (!this.item.ID) {
        alert("Please add new Item first and then upload an image.");
        return;
      }
      var fullpath = this.item.IMAGEURL;
      if (fullpath) {
        //filename = fullpath.split('/').pop() ?? ""; //for filename with ext
        //var fileExt = fullpath.split('.').pop() ?? "";  //for only extension
        filename = fullpath.split('/').pop() ?? "";
        filename = filename.split('.')[0];
      }

      if (this.selectedFiles) {
        const file: File | null = this.selectedFiles.item(0);

        if (this.isValidFileExtension(this.selectedFiles.item(0)) == false) {
            //alert('uploading false...');
          //this.toastr.warning('Something went wrong', 'Data Validation');
          alert("Invalid format or extension. Allowed extensions are: " + this.validFileExtensions.join(", "));
          return;
        }
        if (file) {
          //alert('uploading11...');
          this.currentFile = file;
          this.service.uploadImage(this.currentFile, filename).subscribe({
            next: (event: any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round((100 * event.loaded) / event.total);
              } else if (event instanceof HttpResponse) {
                this.message = event.body.message;
                this.imageInfos = this.service.getFiles();
              }
              this.router.navigate(['/admin']);
            },
            error: (err: any) => {
              console.log(err);
              this.progress = 0;

              if (err.error && err.error.message) {
                this.message = err.error.message;
              } else {
                this.message = 'Could not upload the image!';
              }

              this.currentFile = undefined;
            },
          });
        }

        this.selectedFiles = undefined;
      }
    }

  getFileNameOnly() {
    var fullpath = this.item.IMAGEURL;
    if (fullpath) {
      var filename = fullpath.split('/').pop();
    }
  }

  submit() {
    //alert('submit clicked');
    //value.ID = this.item.ID;
    //value.zip = this.item.zip || 0;
    // var customer: ICustomer = {
    //   id: this.customer.id,
    // };

    if (this.item.ID) {
      //alert(this.item.ID);
      //var filename = fullpath.split('/').pop().split('.')[0];
      this.service.updateItemDetails(this.item)
        .subscribe((response: any) => {
          if (response) {
            //alert(response);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Updated User details',life:3000 });
            this.router.navigate(['/updateitems']);
          }
          else {
            this.errorMessage = 'Unable to save customer';
          }
        },
          (err) => console.log(err));

    } else {

      //alert('inserting new item...');
        this.service.insertItemDetails(this.item)
        .subscribe((response: any) => {
          if (response) {
            alert(response);
            this.router.navigate(['/updateitems']);
          }
          else {
            this.errorMessage = 'Unable to add customer';
          }
        },
          (err) => console.log(err));

    }
  }

  //submit() {
  //  //{value, valid}: { value: ItemDetails, valid: boolean }
  //  //value.ID = this.item.ID;
  //  //value.TOTALITEMSINPACK = this.item.TOTALITEMSINPACK || '0';
  //  if (this.item.ID) {

  //    this.service.updateItemDetails(this.item)
  //      .subscribe((customer: ItemDetails) => {
  //        if (customer) {
  //          this.router.navigate(['/items']);
  //        }
  //        else {
  //          this.errorMessage = 'Unable to save item details';
  //        }
  //      },
  //        (err) => console.log(err));

  //  } else {

  //    this.service.insertItemDetails(this.item)
  //      .subscribe((customer: ItemDetails) => {
  //        if (customer) {
  //          this.router.navigate(['/items']);
  //        }
  //        else {
  //          this.errorMessage = 'Unable to add customer';
  //        }
  //      },
  //        (err) => console.log(err));
  //  }
  //}

  cancel(event: Event) {
    //event.preventDefault();
    //this.router.navigate(['/admin']);
    const page = this.route.snapshot.queryParams['page'] || 0;
    this.router.navigate(['/updateitems'], { queryParams: { page } });

  }

  delete(event: Event) {
  //   event.preventDefault();
  //   this.service.deleteItem(this.item.ID as string)
  //     .subscribe((status: any) => {
  //       if (status) {
  //         this.router.navigate(['/admin']);
  //       }
  //       else {
  //         this.errorMessage = 'Unable to delete customer';
  //       }
  //     },
  //       (err) => console.log(err));
  }
}
