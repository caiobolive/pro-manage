import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Person, AddressSearch } from '../models/person';
import { Routine } from '../models/routine';
import { Task } from '../models/task';
import { Assignment } from '../models/assignment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private mockPeople: Person[] = [
    {
      id: '1',
      personType: 'Employee',
      name: 'John Doe',
      cpfCnpj: '123.456.789-00',
      gender: 'Male',
      contractType: 'Permanent',
      department: { 
        id: '1', 
        name: 'Development', 
        companyId: '1', 
        createdAt: '2024-01-01T00:00:00Z', 
        updatedAt: '2024-01-01T00:00:00Z', 
        deletedAt: ''
      },
      departmentId: '1',
      responsibility: { id: '1', name: 'Developer', createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z', deletedAt: '' },
      responsibilityId: '1',
      company: {
        id: '1',
        fantasyName: 'Tech Innovations Inc.',
        corporateReason: 'Technology Solutions',
        cnpj: '12345678901234',
        email: 'contact@techinnovations.com',
        website: 'www.techinnovations.com',
        companyType: 'HEADQUARTERS',
        holdingId: '1',
        holding: {
          id: '1',
          fantasyName: 'Global Tech Holdings',
          corporateReason: 'Holding Company',
          cnpj: '98765432109876',
          email: 'info@globaltechholdings.com',
          website: 'www.globaltechholdings.com',
          segment: { 
            id: '1', 
            name: 'Technology', 
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
            deletedAt: '', 
          },
          segmentId: '1',
          contact: { phone: '1111-2222', cellphone: '9999-8888' },
          address: {
            cep: '70000000',
            streetName: 'Tech Park Ave',
            neighborhood: 'Innovation District',
            city: 'Tech City',
            uf: 'TC',
            complement: 'Building 1',
          },
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
          deletedAt: '',
        },
        contact: { phone: '1111-2222', cellphone: '9999-8888' },
        address: {
          cep: '70000000',
          streetName: 'Tech Park Ave',
          neighborhood: 'Innovation District',
          city: 'Tech City',
          uf: 'TC',
          complement: 'Building 1',
        },
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        deletedAt: '',
      },
      companyId: '1',
      user: { username: 'johndoe', email: 'johndoe@example.com', roles: [{id: '1', name: 'ROLE_USER'}], password: 'password' },
      address: { cep: '70000000', streetName: 'Main St', neighborhood: 'Central', city: 'City', uf: 'State', complement: 'Apt 101' },
      contact: { phone: '1234-5678', cellphone: '9876-5432' },
      tasks: [
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
        {
          id: '2',
          name: 'Implement feature 123',
          persons: [],
          personId: '1',
          appointment: null,
          startedAt: new Date(),
          finishedAt: new Date(),
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
          deletedAt: '',
        }
    ],
      routines: [],
      assignments: [],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      deletedAt: '',
    },
  ];

  constructor() { }

  findAll(): Observable<Person[]> {
    return of(this.mockPeople);
  }

  findById(id: string): Observable<Person> {
    const person = this.mockPeople.find(p => p.id === id);
    return of(person);
  }

  create(person: Person): Observable<Person> {
    this.mockPeople.push(person);
    return of(person);
  }

  update(id: string, person: Person): Observable<Person> {
    const index = this.mockPeople.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockPeople[index] = person;
    }
    return of(person);
  }

  delete(id: string): Observable<Person> {
    const index = this.mockPeople.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockPeople.splice(index, 1);
    }
    return of(null); // Or return an empty object as per your requirement
  }

  removePersonFromCompany(personId: string, companyId: string): Observable<Person> {
    return of(this.mockPeople.find(p => p.id === personId && p.companyId === companyId));
  }

  findAllByCompany(idCompany: string): Observable<Person[]> {
    return of(this.mockPeople.filter(p => p.companyId === idCompany));
  }

  addRoutinesToPerson(routineIds: string[], personId: string): Observable<any> {
    return of({ message: `Routines added to person ${personId}` });
  }
  
  addTasksToPerson(taskIds: string[], personId: string): Observable<any> {
    return of({ message: `Tasks added to person ${personId}` });
  }
  
  addAssignmentsToPerson(assignmentIds: string[], personId: string): Observable<any> {
    return of({ message: `Assignments added to person ${personId}` });
  }

  findAddress(cep: string): Observable<AddressSearch> {
    return of({
      cep: cep,
      logradouro: 'Main St',
      complemento: 'Apt 101',
      bairro: 'Central',
      localidade: 'City',
      uf: 'State',
      ibge: '1234567',
      gia: '',
      ddd: '12',
      siafi: '1234'
    });
  }
}