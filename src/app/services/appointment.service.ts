import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Appointment, Activity } from '../models/appointment';
import { monthlyTag } from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private mockAppointments: Appointment[] = [
    {
      id: '1',
      name: 'Strategy Planning Meeting',
      person: { id: '1', name: 'John Doe' },
      personId: '1',
      tag: { id: '1', name: 'green-tag' },
      tagId: '1',
      activityType: 'Meeting',
      description: 'Strategic planning meeting for the next quarter.',
      justification: 'Necessary for team alignment.',
      activityId: '1',
      routineId: '1',
      taskId: '1',
      assignmentId: '1',
      createdAt: '2024-04-01T09:00:00Z',
      updatedAt: '2024-04-01T11:00:00Z',
      deletedAt: '',
    },
    {
      id: '2',
      name: 'Results Presentation',
      person: { id: '2', name: 'Jane Smith' },
      personId: '2',
      tag: { id: '2', name: 'blue-tag' },
      tagId: '2',
      activityType: 'Presentation',
      description: 'Presentation of the last project\'s results to the board.',
      justification: 'Important for project closure.',
      activityId: '2',
      routineId: '2',
      taskId: '2',
      assignmentId: '2',
      createdAt: '2024-04-02T14:00:00Z',
      updatedAt: '2024-04-02T15:00:00Z',
      deletedAt: '',
    }
  ];

  private mockActivities: Activity[] = [
    {
      id: '1',
      name: 'Report Drafting',
      type: 'task',
      description: 'Drafting the monthly sales report.',
      justification: 'Report necessary for the board meeting.',
      tag: { id: '3', name: 'yellow-tag' },
      tagId: '3',
    },
    {
      id: '2',
      name: 'Market Analysis',
      type: 'task',
      description: 'Analysis of market trends for the upcoming semester.',
      justification: 'Essential for strategic planning.',
      tag: { id: '4', name: 'orange-tag' },
      tagId: '4',
    }
  ];

  private mockMonthlyTags: monthlyTag[] = [
    { tag: 'green-tag', date: '2024-04-05' },
    { tag: 'blue-tag', date: '2024-04-12' },
    { tag: 'yellow-tag', date: '2024-04-19' },
    { tag: 'orange-tag', date: '2024-04-26' },
  ];

  constructor() { }

  findAll(): Observable<Appointment[]> {
    return of(this.mockAppointments);
  }

  findById(id: string): Observable<Appointment> {
    const appointment = this.mockAppointments.find(a => a.id === id);
    return of(appointment);
  }

  findByPersonAndDate(personId: string, startDate: Date, endDate: Date): Observable<Appointment[]> {
    const filteredAppointments = this.mockAppointments.filter(a => a.personId === personId);
    return of(filteredAppointments);
  }

  findActivitiesByPersonAndDate(personId: string, startDate: Date, endDate: Date): Observable<Activity[]> {
    const filteredActivities = this.mockActivities;
    return of(filteredActivities);
  }

  create(appointment: Appointment): Observable<Appointment> {
    this.mockAppointments.push(appointment);
    return of(appointment);
  }

  update(id: string, appointment: Appointment): Observable<Appointment> {
    const index = this.mockAppointments.findIndex(a => a.id === id);
    if (index !== -1) {
      this.mockAppointments[index] = appointment;
    }
    return of(appointment);
  }

  delete(id: string): Observable<{}> {
    const index = this.mockAppointments.findIndex(a => a.id === id);
    if (index !== -1) {
      this.mockAppointments.splice(index, 1);
    }
    return of({});
  }

  getMonthlyTags(personId: string, startDate: Date, endDate: Date): Observable<monthlyTag[]> {
    return of(this.mockMonthlyTags);
  }
}
