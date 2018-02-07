import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventsService } from '../../shared/services/events.service';
import { CategoriesService } from '../../shared/services/categories.service';
import { AppEvent } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-history-detail',
    templateUrl: './history-detail.component.html',
    styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

    event: AppEvent;
    category: Category;
    isLoaded: boolean = false;
    s1: Subscription;

    constructor(private route: ActivatedRoute, private eventService: EventsService, private categoriesService: CategoriesService) {}

    ngOnInit() {
        this.s1 = this.route.params
            .mergeMap((params: Params) => this.eventService.getEventById(params['id']))
            .mergeMap((event: AppEvent) => {
                this.event = event;
                return this.categoriesService.getCategoryById(event.category);
            })
            .subscribe((category: Category) => {
                this.category = category;
                this.isLoaded = true;
        });
    }

    ngOnDestroy(): void {
        if (this.s1) this.s1.unsubscribe();
    }

}
