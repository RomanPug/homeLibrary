import { Component, Input, OnInit } from '@angular/core';
import { AppEvent } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';

@Component({
    selector: 'app-history-events',
    templateUrl: './history-events.component.html',
    styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

    @Input() categories: Category[] = [];
    @Input() events: AppEvent[] = [];

    searchValue = '';
    searchPlaceholder = 'Сумма';
    searchField = 'amount';

    constructor() {
    }

    ngOnInit() {
        this.events.forEach((e) => {
            e.catName = this.categories.find(c => c.id === e.category).name;
        })
    }

    getEventClass(event: AppEvent){
        return {
            'label': true,
            'label-danger': event.type === 'outcome',
            'label-success': event.type === 'income'
        }
    }

    changeCriteria(field: string) {
        const namesMap = {
            amount: 'Сумма',
            date: 'Дата',
            category: 'Категория',
            type: 'Тип'
        };

        this.searchPlaceholder = namesMap[field];
        this.searchField = field;
    }

}
