import { PersonService } from '../../../services/person.service';
import { MatTableDataSource } from '@angular/material/table';
import { Person } from '../../../models/person';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteConfirmationModalComponent } from '../../../components/delete/delete-confirmation-modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
})
export class PersonListComponent implements OnInit {
  persons: Person[] = [];

  ELEMENT_DATA: Person[] = [];
  FILTERED_DATA: Person[] = [];

  displayedColumns: string[] = [
    'name',
    'email',
    'cpfCnpj',
    'department',
    'phone',
    'responsibility',
    'fantasyName',
    'personType',
    'actions',
  ];
  dataSource = new MatTableDataSource<Person>(this.persons);

  public isLoading: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private personService: PersonService,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.findAll();
  }

  findAll() {
    this.personService.findAll().subscribe((response) => {
      this.persons = response;
      this.dataSource = new MatTableDataSource<Person>(response);
      this.dataSource.paginator = this.paginator;
      this.isLoading = false;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editPerson(personId: string): void {
    this.router.navigate(['person', 'edit', personId]);
  }

  openDeleteConfirmationModal(personId: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationModalComponent);

    dialogRef.componentInstance.message =
      'Tem certeza que deseja deletar este employee?';

    dialogRef.componentInstance.deleteConfirmed.subscribe(() => {
      this.deletePerson(personId);
      dialogRef.close();
      this.toast.success('Employee deletado com sucesso', 'Excluir');
    });

    dialogRef.componentInstance.deleteCanceled.subscribe(() => {
      dialogRef.close();
    });
  }

  deletePerson(personId: string): void {
    this.personService.delete(personId).subscribe(() => {
      this.findAll();
    });
  }

  getPersonTypeLabel(personType: string) {
    if (personType === 'EMPLOYEE') {
      return 'Employee';
    }
    return '';
  }
}
