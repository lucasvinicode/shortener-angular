import { ChangeDetectorRef, Component, ElementRef, importProvidersFrom, QueryList, ViewChildren } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import {CdkDragDrop, CdkDrag, moveItemInArray, DragDropModule} from '@angular/cdk/drag-drop';
import { HttpClient, HttpClientModule, HttpHeaders, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Steps } from './enums';
import {ClipboardModule} from '@angular/cdk/clipboard'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
	RouterOutlet,
	MatFormFieldModule,
	FormsModule,
	MatButtonModule, 
	MatIconModule,
	MatInputModule,
	MatIconModule,
	ReactiveFormsModule,
	MatCheckboxModule,
	CommonModule,
	DragDropModule,
	ClipboardModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
	apiUrl: string = 'https://api.encurtador.dev/encurtamentos';
	formGroup: FormGroup;
	result: string = '';
	step: Steps = Steps.Init;

	constructor(private fb: FormBuilder, private http: HttpClient) {
		this.formGroup = fb.group({
			text: this.fb.control('', Validators.required)
		})
	}
	
	onSubmit(){
		this.http.post<Result>(this.apiUrl, {url: this.formGroup.value.text}).subscribe({
			next: (r) => {
				this.result = r.urlEncurtada;
				this.step = Steps.Created;
			}
		})
	}

	back() {
		this.formGroup.get('text')?.reset();
		this.step = Steps.Init;
	}
}

export interface Result {
	urlEncurtada: string
}
