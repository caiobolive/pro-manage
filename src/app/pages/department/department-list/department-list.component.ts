import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Department } from '../../../models/department';
import { DepartmentService } from '../../../services/department.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationModalComponent } from '../../../components/delete/delete-confirmation-modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
})
export class DepartmentListComponent implements OnInit {
  ELEMENT_DATA: Department[] = [];
  FILTERED_DATA: Department[] = [];

  displayedColumns: string[] = ['name', 'company', 'actions'];
  dataSource = new MatTableDataSource<Department>(this.ELEMENT_DATA);

  public isLoading: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.findAll();
  }

  findAll(): void {
    this.departmentService.findAll().subscribe((response) => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Department>(response);
      this.dataSource.paginator = this.paginator;
      this.isLoading = false;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editDepartment(departmentId: string): void {
    const companyId = this.route.snapshot.paramMap.get('idCompany');
    this.router.navigate(['department', 'edit', departmentId]);
  }

  openDeleteConfirmationModal(companyId: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationModalComponent);

    dialogRef.componentInstance.message =
      'Tem certeza que deseja deletar esta company?';

    dialogRef.componentInstance.deleteConfirmed.subscribe(() => {
      this.deleteCompany(companyId);
      dialogRef.close();
      this.toast.success('Department deletado com sucesso', 'Excluir');
    });

    dialogRef.componentInstance.deleteCanceled.subscribe(() => {
      dialogRef.close();
    });
  }

  deleteCompany(departmentId: string): void {
    this.departmentService.delete(departmentId).subscribe(() => {
      this.findAll();
    });
  }
}
