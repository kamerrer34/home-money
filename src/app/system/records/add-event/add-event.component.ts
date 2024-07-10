import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { FormsModule, NgForm } from "@angular/forms";
import { Subscription, combineLatest } from "rxjs";
import moment from 'moment';
import { BillService } from "../../../shared/services/bill.service";
import { EventsService } from "../../../shared/services/events.service";
import { Category } from "../../../shared/models/category.model";
import { AppEvent } from "../../../shared/models/event.model";
import { Message } from "../../../shared/models/message.model";
import { Bill } from "../../../shared/models/bill.model";

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgClass,
    NgIf
  ],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss'
})
export class AddEventComponent implements OnInit, OnDestroy {
  constructor(
    private billService: BillService,
    private eventsService: EventsService
  ) {}

  @Input() categories: Category[] = [];

  sub1!: Subscription;
  sub2!: Subscription;

  types = [
    { type: 'income', label: 'Доход' },
    { type: 'outcome', label: 'Расход' }
  ];
  message!: Message;

  ngOnInit() {
    this.message = new Message('danger', '');
  }

  private showMessage(text: string) {
    this.message.text = text;

    window.setTimeout(() => {
      this.message.text = ''
    }, 3000);
  }

  onSubmit(form: NgForm) {
    let { amount, description, category, type } = form.value;
    if (amount < 0) amount *= -1;

    const event: AppEvent = new AppEvent(
      type,
      amount,
      category.toString(),
      moment().format('DD.MM.YYYY HH:mm'),
      description
    );

    this.sub1 = this.billService.getBill()
      .subscribe((bill: Bill) => {
        let value: number = 0;
        if (type === 'outcome') {
          if (amount > bill.value) {
            this.showMessage(
              `На счету недостаточно средств. Вам нехватает ${amount - bill.value}`
            );
            return;
          } else {
            value = bill.value - amount;
          }
        } else {
          value = bill.value + amount;
        }

        this.sub2 = combineLatest([
          this.billService.updateBill({ value, currency: bill.currency }),
          this.eventsService.addEvent(event)
        ])
          .subscribe(() => {
            form.setValue({
              amount: 0,
              description: ' ',
              category: 1,
              type: 'outcome'
            });
          });
      });
  }

  ngOnDestroy() {
    if (this.sub1) this.sub1.unsubscribe();
    if (this.sub2) this.sub2.unsubscribe();
  }

}
