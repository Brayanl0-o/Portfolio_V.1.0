import {  Component, Renderer2, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ContactService } from 'src/app/services/contact.service';
import { CustomSnackbarComponent } from '../custom-snackbar/custom-snackbar.component';
@Component({
  selector: 'app-form-contact',
  templateUrl: './form-contact.component.html',
  styleUrls: ['./form-contact.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class FormContactComponent {
  constructor(private contactService: ContactService,
    private renderer: Renderer2,
    private fb:FormBuilder,
    private snackBar: MatSnackBar){}

    contactForm!: FormGroup;
    errorResponseMessageForm: string | null = null;
    showContactForm: boolean = false;
    showNotAvaible: boolean = false
    showDetailsProject: boolean =  false;
    isLoading: boolean = false;

    openSnackBar(){
      const config = new MatSnackBarConfig();
      config.duration = 8000;
      config.horizontalPosition = 'center';
      config.verticalPosition = 'bottom';

      config.data = {
        message: '¡Formulario enviado con éxito! \n Pronto me contactaré contigo.',
        // background: '#0052f5'
      };
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: config.data,
        duration: config.duration,
        horizontalPosition: config.horizontalPosition,
        verticalPosition: config.verticalPosition,
      });
    }
    ngOnInit(){
      this.contactForm = this.initForm();
    }

    sendForm(){
      this.isLoading = true;

      if(this.contactForm.valid){
        const emailData = this.contactForm.value;
        this.contactService.sendInfoForm(emailData).subscribe((response) =>{
          this.closeModal()
          this.isLoading = false;
          this.openSnackBar()
          // this.contactService.$success_send.emit(true)
          // setTimeout(() => {
          //   this.contactService.$success_send.emit(false);
          // }, 5000);
        },
        (err)=> {
          console.error('Error send form', err);
          this.errorResponseMessageForm = '¡Error del servidor! \n Vuelve a intentarlo mas tarde.';
          this.isLoading = false;
          setTimeout(() => {
            this.errorResponseMessageForm = null;
          }, 5000);


        })
      }else{
        this.errorResponseMessageForm = '¡Falta un campo!';
        this.isLoading = false;

        setTimeout(() => {
          this.errorResponseMessageForm = null;
        }, 5000);

      }
    }
    initForm(): FormGroup{
      return this.fb.group({
        sendersName: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(80),Validators.pattern('[A-Za-z\\s]+')]],
        emailAddress:['', [Validators.required, Validators.minLength(8),Validators.maxLength(90),Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
        message:['', [Validators.required, Validators.minLength(8),Validators.maxLength(600),Validators.pattern('[A-Za-z\\s]+')]],
      })
    }
    toggleShowDetails(){
      this.showDetailsProject = !this.showDetailsProject;
    }
    closeModal() {
      // this.renderer.removeStyle(document.body, 'overflow');
      this.contactService.$modal.emit(false)
    }

}

