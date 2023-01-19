import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  form!: FormGroup
  lineItems!: FormArray
  name = "fredd"
  order!: Order
  
  constructor(private fb: FormBuilder) {  }
  
  ngOnInit():void {
    // build the form
    this.form = this.createForm()
  }

  process() {
    this.order = this.form.value as Order
    console.info('>> form:', this.order)
  }

  clearForm() {
    this.form = this.createForm()
    // clear form
    // this.form.reset()
  }

  public addItem() {
    this.lineItems.push(this.createLineItem())
  }

  public deleteItem(idx: number) {
    this.lineItems.removeAt(idx)
  }

  private createForm(): FormGroup {
    this.lineItems = this.fb.array([])
    return this.fb.group({
      name: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      rush: this.fb.control<boolean>(false),
      lineItems: this.lineItems
    })
  }

  private createLineItem(): FormGroup {
    return this.fb.group({
      item: this.fb.control<string>('', [Validators.required]),
      quantity: this.fb.control<number>(1, [Validators.min(1), Validators.max(100)]),
    })
  }
}
