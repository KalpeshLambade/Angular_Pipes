import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TodoService } from './services/todo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('todoinput') todoInput!:ElementRef ;
  private todoSubscriptions!: Subscription;
  viewList: Array<{name:string,checked:boolean}> = [];

  constructor(private toDoService: TodoService) {}

  ngOnInit() {
    this.viewList = this.toDoService.todoList;

    this.todoSubscriptions = this.toDoService.todoChanges.subscribe(() => {
      this.viewList = this.toDoService.todoList;
    })
  }

  addNewTodo() {
    let todo = this.todoInput.nativeElement.value;
    if (todo) {
      this.toDoService.addTodo(todo, false);
    }
    this.todoInput.nativeElement.value = "";
  }

  ischeckClicked(todo: HTMLInputElement, index:number){
    this.toDoService.updateTodo(index, todo.checked);
  }

  ngOnDestroy() {
    this.todoSubscriptions.unsubscribe();
  }
}
