import { Component, OnInit } from '@angular/core';
import { UserData, UserService } from 'src/app/services/user-service/user.service';
import { map, tap } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  filterValue: string = null;
  dataSource: UserData = null;
  pageEvent: PageEvent;
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'role'];

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.findAll(1,10);
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    page = page +1;

    if(this.filterValue === null || this.filterValue === '') {
      this.findAll(page, size);
    } else {
      this.userService.paginateByName(page, size, this.filterValue).pipe(
        map((userData: UserData) => this.dataSource = userData)
      ).subscribe()
    }

  }

  findByName(username: string) {
    if(username === null || username === '') {
      this.findAll(1, 10);
    } else {
      this.userService.paginateByName(1, 10, username).pipe(
        map((userData: UserData) => this.dataSource = userData)
      ).subscribe()  
    }
  }

  findAll(page: number, size: number) {
    this.userService.findAll(page, size).pipe(
      map((userData: UserData) => this.dataSource = userData)
    ).subscribe();
  }

  navigateToProfile(id) {
    this.router.navigate(['./' + id], {relativeTo: this.activatedRoute});
  }

}
