import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoChanges = new Subject<{name:string,checked:boolean}>();

  todoList = [
    {name: "Learn angular",checked: false},
  ];

  constructor() { }


  addTodo(name:string, checked:boolean){
    this.todoList.push({
      name,
      checked
    });
    this.todoChanges.next({name,checked});
  }

  updateTodo(index:number, checked:boolean){
    this.todoList[index].checked = checked;
  }

}
