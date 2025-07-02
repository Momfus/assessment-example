import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {

  userService = inject(UserService)
  isLoading = signal<boolean>(false);

  searchInput = signal<string>('');

  userList = signal<User[]>([])
  showUserList = signal<User[]>(this.userList())

  ngOnInit() {
    this.loadingUser();
  }

  loadingUser() {

    this.userService.getUsers().subscribe(
      (res: User[]) => {
        console.log(res);

        this.userList.set(res);
        this.showUserList.set( this.userList() )
      },
      (error => {
        console.error(error);

      })
     )

  }

  onSearch() {
    console.log(this.searchInput());

    const filterValue = this.userList().filter( x => x.name.toLowerCase().includes(this.searchInput().trim().toLowerCase()))

    this.showUserList.set(filterValue);
    console.log(filterValue);

  }

  onClear() {
    this.showUserList.set( this.userList() )
    this.searchInput.set('')
  }

}
