import { RoutineService } from '../../../services/routine.service';
import { Routine } from '../../../models/routine';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationModalComponent } from '../../../components/delete/delete-confirmation-modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-routine-list',
  templateUrl: './routine-list.component.html',
  styleUrls: ['./routine-list.component.css'],
})
export class RoutineListComponent implements OnInit {
  ELEMENT_DATA: Routine[] = [];
  FILTERED_DATA: Routine[] = [];

  displayedColumns: string[] = ['name', 'persons', 'actions'];
  dataSource = new MatTableDataSource<Routine>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public isLoading: boolean = false;

  constructor(
    private routineService: RoutineService,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private toast: ToastrService
  ) {
    this.dataSource = new MatTableDataSource<Routine>(this.ELEMENT_DATA);
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.findAll();
  }

  findAll(): void {
    this.routineService.findAll().subscribe((response) => {
      if (response) {
        this.ELEMENT_DATA = response;
        this.dataSource = new MatTableDataSource<Routine>(response);
        this.dataSource.paginator = this.paginator;
      }
      this.isLoading = false;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  editRoutine(routineId: string): void {
    this.router.navigate(['routine', 'edit', routineId]);
  }

  openDeleteConfirmationModal(routineId: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationModalComponent);

    dialogRef.componentInstance.message =
      'Tem certeza que deseja deletar esta routine?';

    dialogRef.componentInstance.deleteConfirmed.subscribe(() => {
      this.deleteRoutine(routineId);
      dialogRef.close();
      this.toast.success('Routine deletada com sucesso', 'Excluir');
    });

    dialogRef.componentInstance.deleteCanceled.subscribe(() => {
      dialogRef.close();
    });
  }

  deleteRoutine(routineId: string): void {
    this.routineService.delete(routineId).subscribe(() => {
      this.findAll();
    });
  }
}
