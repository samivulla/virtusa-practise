import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { CurdserviceService } from "../../service/curdservice.service";
import { Hero } from "../../models/hero";
import { BehaviourService } from '../../service/behaviour.service';
import { Store, select } from '@ngrx/store';
import { increment, decrement, reset } from '../../store/counter.action';
declare var $: any;
@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
  username: string;
  password: string;
  userData: any;
  name = "";
  value: string;
  public heroes: Hero[];
  private selectedData: any;
  public behaviourData: string;
  count$: Observable<number>;
  constructor(
    private route: ActivatedRoute,
    private curdserviceService: CurdserviceService,
    private behaviourService: BehaviourService,
    private store: Store<{ count: number }>
  ) {
    this.count$ = store.pipe(select('count'));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userData = JSON.parse(params.data);
    });
    this.getUsers();
    this.behaviourService.data.subscribe(data => {
      this.behaviourData = data;
      //do what ever needs doing when data changes
    });
  }

  getUsers() {
    this.curdserviceService.getHeroes().subscribe(data => {
      this.heroes = data;
    });
    this.behaviourService.updatedDataSelection('samivulla');
  }

  // getSelectedUser(id) {
  //   this.curdserviceService.getSelecetedData(id).subscribe(
  //     data => {
  //       this.selectedData = data;
  //     }
  //   )}

  updateUser(id, value) {
    this.value = value;
    this.curdserviceService.getSelecetedData(id).subscribe(data => {
      this.userData = data;
      $("#exampleModalCenter").modal("show");
      this.name = this.userData.name;
    });
  }
  addUser() {
    let user = {
      id: this.heroes.length + 1,
      name: this.name
    };
    if (this.value == "update") {
      this.userData.name = this.name;
      this.curdserviceService.updateUser(this.userData).subscribe(data1 => {
        this.name = "";
        this.value = null;
        $("#exampleModalCenter").modal("hide");
      });
    } else {
      this.curdserviceService.addUser(user).subscribe(data => {
        this.name = "";
        $("#exampleModalCenter").modal("hide");
      });
    }

    this.getUsers();
  }

  deleteUser(id) {
    this.curdserviceService.deleteUser(id).subscribe(data => {
      this.getUsers();
    });
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
}
