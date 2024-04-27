import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TaskList, Filter } from '../../model/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {



  taskList: TaskList[] = [];
  typeFilter = Filter;
  filter = Filter.all

  newTaskCtrl = new FormControl('', { nonNullable: true, validators: [Validators.required] });

  constructor() {
    // this.taskList = [
    //   {
    //     id: Date.now(),
    //     text: 'Formatear PC',
    //     completed: false
    //   }, {
    //     id: Date.now(),
    //     text: 'Eliminar Bloatware',
    //     completed: false
    //   }, {
    //     id: Date.now(),
    //     text: 'Instalar Office',
    //     completed: false
    //   }, {
    //     id: Date.now(),
    //     text: 'Instalar Docker',
    //     completed: false
    //   }
    // ];    
  }

  ngOnInit() {
    const storage = localStorage.getItem('task');
    if (storage) {
      const task = JSON.parse(storage);
      this.taskList = task;
    }
  }

  saveInLocalStorage() {
    localStorage.setItem('task', JSON.stringify(this.taskList));
  }

  changeHandler() {
    this.taskList.push({
      id: Date.now(),
      text: this.newTaskCtrl.value,
      completed: false
    });

    this.newTaskCtrl.setValue('');
    this.saveInLocalStorage();
  }

  updateTaskEditing(index: number) {
    this.taskList = this.taskList.map((task, id) => {
      if (id === index) {
        return { ...task, editable: true };
      } else {
        return { ...task, editable: false };
      }
    });
  }

  updateTask(index: number) {
    this.taskList[index].completed = true;
    this.saveInLocalStorage();
  }

  deleteTask(index: number) {
    this.taskList.splice(index, 1);
    this.saveInLocalStorage();
  }

  updateTaskTitle(index: number, event: Event) {
    const input = event.target as HTMLInputElement
    this.taskList[index].text = input.value;
    this.taskList[index].editable = false;
    this.saveInLocalStorage();
  }

  taskByFilter() {
    switch (this.filter) {
      case Filter.pending:
        return this.taskList.filter(task => !task.completed);
      case Filter.completed:
        return this.taskList.filter(task => task.completed);
      default:
        return this.taskList
    }
  }

  changeFilter(filter: Filter) {
    this.filter = filter;
  }

  deleteCompletedTask() {
    this.taskList = this.taskList.filter((task) => !task.completed);
    this.saveInLocalStorage();
    return  this.taskList;
    
  }

  blurInput(index: number, event: Event) {
    const input = event.target as HTMLInputElement
    input.value = this.taskList[index].text;
    this.taskList[index].editable = false;

  }
}
