import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private todoSubscriptions!: Subscription;
  viewList: Array<{name:string,checked:boolean}> = [];

  constructor(private toDoService: TodoService) {}

  ngOnInit() {
    this.viewList = this.toDoService.todoList;

    this.todoSubscriptions = this.toDoService.todoChanges.subscribe(() => {
      this.viewList = this.toDoService.todoList;
    })
  }

  addNewTodo(todo: HTMLInputElement) {
    if (todo.value) {
      this.toDoService.addTodo(todo.value, todo.checked);
    }
  }

  ischeckClicked(todo: HTMLInputElement, index:number){
    this.toDoService.updateTodo(index, todo.checked);
  }

  ngOnDestroy() {
    this.todoSubscriptions.unsubscribe();
  }
}
