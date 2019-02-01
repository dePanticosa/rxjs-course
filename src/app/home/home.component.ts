import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor() {

  }

  ngOnInit() {
    const http$: Observable<Course[]> = createHttpObservable('/api/coures');
    const courses$ = http$
      .pipe(
        tap(() => console.log('HTTP')),
        map(res => res['payload']),
        shareReplay()
      );
    this.beginnerCourses$ = courses$
      .pipe(
        map(courses => courses
          .filter(course => course.category === 'BEGINNER'))
      );

    this.advancedCourses$ = courses$
      .pipe(
        map(courses => courses
          .filter(course => course.category === 'ADVANCED'))
      );

  }

}