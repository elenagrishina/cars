import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICar } from 'src/app/models/car';
import { ActionType } from 'src/app/models/action-type';

@Component({
    selector: 'app-car-card',
    templateUrl: './car-card.component.html',
    styleUrls: ['./car-card.component.scss']
})
export class CarCardComponent {

    @Input() car: ICar;
    @Output() action = new EventEmitter<{carId: number, action: ActionType}>();

    onAction(action: ActionType, event: MouseEvent): void {
        if (event) {
            event.stopPropagation();
        }
        this.action.emit({carId: this.car.id, action});
    }
}
