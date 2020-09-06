import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor, FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-package-selector',
  templateUrl: './package-selector.component.html',
  styleUrls: ['./package-selector.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PackageSelectorComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PackageSelectorComponent),
      multi: true
}
  ]
})
export class PackageSelectorComponent implements OnInit, ControlValueAccessor, Validator {
  selectedPrice: number;
  private onChange: (_: any) => void;
  private onTouched: () => void;
  constructor() { }

  ngOnInit(): void {
  }

  registerOnChange(fn: (_: any) => void): void {
    console.log('inside regiser on change');
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    console.log('inside regiser ontouched');
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    console.log('write Value');
    this.selectedPrice = obj;
  }
  selectedPackage(pkg: string){
    console.log('selected is ', pkg);
    switch (pkg) {
      case 'base' : {
        this.selectedPrice = 0;
        this.onChange(this.selectedPrice);
        this.onTouched();
        break;
      }
      case 'silver' : {
        this.selectedPrice = 1;
        this.onChange(this.selectedPrice);
        this.onTouched();
        break;
      }
      case 'gold' : {
        this.selectedPrice = 2;
        this.onChange(this.selectedPrice);
        this.onTouched();
        break;
      }
    }
  }

  validate({ value }): ValidationErrors | null {
    // control.setValidators(null);
    console.log('value from validate', value);
    if (value === 0 || value === 1 || value === 2){
      return null;
    }
    return { notselected: { valid: false } };
  }
}
