import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private mockTasks: Task[] = [
    {
      id: '1',
      name: 'Implement feature XYZ',
      persons: [],
      personId: '1',
      appointment: null,
      startedAt: new Date(),
      finishedAt: new Date(),
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      deletedAt: '',
    },
  ];

  constructor() { }

  findAll(): Observable<Task[]> {
    return of(this.mockTasks);
  }

  findById(id: string): Observable<Task> {
    const task = this.mockTasks.find(t => t.id === id);
    return of(task);
  }

  create(task: Task): Observable<Task> {
    this.mockTasks.push(task);
    return of(task);
  }

  update(id: string, task: Task): Observable<Task> {
    const index = this.mockTasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.mockTasks[index] = task;
    }
    return of(task);
  }

  delete(id: string): Observable<Task> {
    const index = this.mockTasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.mockTasks.splice(index, 1);
    }
    return of(null);
  }

  findAllByPerson(idPerson: string): Observable<Task[]> {
    const tasks = this.mockTasks.filter(task => task.personId === idPerson);
    return of(tasks);
  }

  addPersonToTask(personId: string, taskId: string): Observable<Task> {
    console.log(`Adding person ${personId} to task ${taskId}`);
    return of(this.mockTasks.find(task => task.id === taskId));
  }

  addPersonsToTask(persons: string[], taskId: string): Observable<Task> {
    console.log(`Adding persons ${persons.join(', ')} to task ${taskId}`);
    return of(this.mockTasks.find(task => task.id === taskId));
  }
}