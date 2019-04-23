import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  fleets: any;
  searchText: any;
  locations = [];
  serachFleets: any;
  allFleets: any;
  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    // to get fleets on page loads
    this.getFleets();

    // to get current location of user
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     this.lat = position.coords.latitude;
    //     this.lng = position.coords.longitude;
    //   });
    // } else {
    //   alert('Geolocation is not supported by this browser.');
    // }

    // to get current location of driver
    this._apiService.userLocationChanged()
      .subscribe(data => {
        this.locations.push(data);
      });
  }

  getFleets() {
    this._apiService.getFleets().subscribe((res) => {
      this.allFleets = res.fleets ? res.fleets : [];
      this.fleets = this.allFleets;
      this.fleets.map((fleet)=>{
        this.locations.push({lat:fleet.location.lat,long:fleet.location.long});
      })
      console.log(this.locations);
    }, (err) => {
      console.log('Error while fetching fleets', err);
    });
  }
  searchData() {
    this.fleets = this.allFleets
    if (this.searchText !== '' || this.searchText !== undefined) {
      // this.searchText = this.searchText.trim();
      this.fleets = this.fleets.filter((ele) => {
        return ((ele.id.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1) ||
          (ele.name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1) ||
          (ele.location.currentPlace.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1));
      });
    }
  }

  trackUserLocation(fleet) {
    this._apiService.trackUserLocation({id:fleet.id});
  }

}
