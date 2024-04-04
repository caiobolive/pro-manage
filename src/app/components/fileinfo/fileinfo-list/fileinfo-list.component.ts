import { DocumentService } from '../../../services/document.service';
import { MatTableDataSource } from '@angular/material/table';
import { Document } from '../../../models/document';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteConfirmationModalComponent } from '../../delete/delete-confirmation-modal';

@Component({
  selector: 'app-fileinfo-list',
  templateUrl: './fileinfo-list.component.html',
  styleUrls: ['./fileinfo-list.component.css'],
})
export class FileinfoListComponent implements OnInit {
  fileinfos: Document[] = [];

  ELEMENT_DATA: Document[] = [];
  FILTERED_DATA: Document[] = [];

  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new MatTableDataSource<Document>(this.fileinfos);

  s3Url = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private fileinfoService: DocumentService,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.fileinfoService.findAll().subscribe((response) => {
      this.fileinfos = response;
      this.dataSource = new MatTableDataSource<Document>(response);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  downloadFile(key: string) {
    const url = this.s3Url + key;
    const a = document.createElement('a');
    a.href = url;
    a.download = key;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
