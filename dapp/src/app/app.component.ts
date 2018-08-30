import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Web3Service} from './web3.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  myForm: FormGroup;

  items: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(
    private web3service: Web3Service,
    private fb: FormBuilder
  ) {
    this.web3service.initProvider();
  }

  ngOnInit() {
    this.web3service.setValue('nick', 'e-mail');

    const stringVal1 = new FormControl('');
    const stringVal2 = new FormControl('');
    this.myForm = new FormGroup({
      stringVal1,
      stringVal2
    });

    this.readVals();
  }

  submit() {
    console.log('submit', this.myForm);

    this.web3service.setValue(this.myForm.value.stringVal1, this.myForm.value.stringVal2)
      .then((res) => {
        console.log('val set res', res);
        this.readVals();
      });
  }

  get stringVal1() {
    console.log('myForm', this.myForm.get('stringVal1'));
    return this.myForm.get('stringVal1');
  }

  get stringVal2() {
    console.log('myForm', this.myForm.get('stringVal2'));
    return this.myForm.get('stringVal2');
  }


  private readVals() {
    this.web3service.readAll()
      .then(res => {
        console.log('read vals', res);
        this.items.next(res);
      });
  }
}
