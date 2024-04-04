import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  private mockTags: Tag[] = [
    { id: '1', name: 'Red', description: 'Red tag description', class: 'red-appointment', createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z', deletedAt: '' },
    { id: '2', name: 'Orange', description: 'Orange tag description', class: 'orange-appointment', createdAt: '2024-01-02T00:00:00Z', updatedAt: '2024-01-02T00:00:00Z', deletedAt: '' },
    { id: '3', name: 'Yellow', description: 'Yellow tag description', class: 'yellow-appointment', createdAt: '2024-01-03T00:00:00Z', updatedAt: '2024-01-03T00:00:00Z', deletedAt: '' },
    { id: '4', name: 'Green', description: 'Green tag description', class: 'green-appointment', createdAt: '2024-01-04T00:00:00Z', updatedAt: '2024-01-04T00:00:00Z', deletedAt: '' },
    { id: '5', name: 'Blue', description: 'Blue tag description', class: 'blue-appointment', createdAt: '2024-01-05T00:00:00Z', updatedAt: '2024-01-05T00:00:00Z', deletedAt: '' }
  ];

  constructor() { }

  findAll(): Observable<Tag[]> {
    return of(this.mockTags);
  }

  findById(id: string): Observable<Tag> {
    const tag = this.mockTags.find(t => t.id === id);
    return of(tag);
  }

  create(tag: Tag): Observable<Tag> {
    this.mockTags.push(tag);
    return of(tag);
  }

  update(id: string, tag: Tag): Observable<Tag> {
    const index = this.mockTags.findIndex(t => t.id === id);
    if (index !== -1) {
      this.mockTags[index] = tag;
    }
    return of(tag);
  }

  delete(id: string): Observable<Tag> {
    const index = this.mockTags.findIndex(t => t.id === id);
    if (index !== -1) {
      this.mockTags.splice(index, 1);
    }
    return of(null);
  }
}
