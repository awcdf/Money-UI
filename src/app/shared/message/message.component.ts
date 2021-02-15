import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  template: `
  <div *ngIf="temError()" class="p-message p-message-error">
    {{ text }}
  </div>
  `,
  styles: [`
    .p-message-error {
      padding: 3px;
    }
  `]
})
export class MessageComponent {

@Input() error: string = '';
@Input() control: FormControl = new FormControl();
@Input() text: string = '';

temError(): boolean {
  return this.control.hasError(this.error) && this.control.dirty;

}

}
