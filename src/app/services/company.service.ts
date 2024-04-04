import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Company } from '../models/company';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private mockCompanies: Company[] = [
    {
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
    }
  ];

  constructor() { }

  findAll(): Observable<Company[]> {
    return of(this.mockCompanies);
  }

  findById(id: string): Observable<Company> {
    const company = this.mockCompanies.find(c => c.id === id);
    return of(company);
  }

  create(company: Company): Observable<Company> {
    this.mockCompanies.push(company);
    return of(company);
  }

  update(id: string, company: Company): Observable<Company> {
    const index = this.mockCompanies.findIndex(c => c.id === id);
    if (index !== -1) {
      this.mockCompanies[index] = company;
    }
    return of(company);
  }

  delete(id: string): Observable<Company> {
    const index = this.mockCompanies.findIndex(c => c.id === id);
    if (index !== -1) {
      this.mockCompanies.splice(index, 1);
    }
    return of(null);
  }

  linkPersonToCompany(id: string, person: Person): Observable<Person> {
    return of(person);
  }
}