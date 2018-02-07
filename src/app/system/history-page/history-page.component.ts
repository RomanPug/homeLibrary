import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { Observable } from 'rxjs/Observable';
import { Category } from '../shared/models/category.model';
import { AppEvent } from '../shared/models/event.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-history-page',
    templateUrl: './history-page.component.html',
    styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

    constructor(private categoriesService: CategoriesService, private eventsService: EventsService) {
    }

    isLoaded = false;
    chartData = [];
    s1: Subscription;

    categories: Category[] = [];
    events: AppEvent[] = [];

    isFilterVisible = false;

    ngOnInit() {

        this.s1 = Observable.combineLatest(
            this.categoriesService.getCategories(),
            this.eventsService.getEvents()
        ).subscribe((data: [Category[], AppEvent[]]) => {
            this.categories = data[0];
            this.events = data[1];

            this.calculateChartData();
            this.isLoaded = true;
        });

    }

    calculateChartData(): void {
        this.chartData = [];

        this.categories.forEach((c) => {
            const catEvents = this.events.filter((e) => e.category === c.id && e.type === 'outcome');
            this.chartData.push({
                name: c.name,
                value: catEvents.reduce((total, event) => {
                    total += event.amount;
                    return total;
                }, 0)
            });
        });
    }

    private toggleFilterVisibility(dir: boolean) {
        this.isFilterVisible = dir;
    }

    openFilter() {
        this.toggleFilterVisibility(true);
    }

    onFilterApply(filterData) {

    }

    onFilterCancel() {
        this.toggleFilterVisibility(false);
    }

    ngOnDestroy(): void {
        if (this.s1) {
            this.s1.unsubscribe();
        }
    }

}
