import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Optional,
  Output,
  ViewChild,
} from '@angular/core';
import { DayviewSchedulerComponent } from '../dayview-scheduler/dayview-scheduler.component';
import {
  CdkDrag,
  CdkDragEnd,
  CdkDragHandle,
  CdkDragMove,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'lib-dayview-appointment',
  standalone: true,
  imports: [CdkDrag, CdkDragHandle],
  templateUrl: './dayview-appointment.component.html',
  styleUrl: './dayview-appointment.component.css',
})
export class DayviewAppointmentComponent {
  @ViewChild('boxElement', { static: true }) boxElement?: ElementRef;

  @Input() start?: number;
  @Input() duration?: number = 60;
  @Input() padleft: number = 0;
  @Input() count: number = 1;
  @Output() startChanged = new EventEmitter<number>();
  @Output() startChanging = new EventEmitter<number>();

  constructor(@Optional() private parent: DayviewSchedulerComponent) {
    if (!parent) {
      throw new Error('ChildComponent must be rendered within ParentComponent');
    }
  }

  move($event: CdkDragMove<unknown>) {
    this.startChanging.emit($event.distance.y);
  }

  drop($event: CdkDragEnd<unknown>) {
    console.log($event);
    this.startChanged.emit((this.start || 0) + $event.distance.y);
  }
}
