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
  lat: Number;
  lng: Number;
  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    // to get fleets on page loads
    this.getFleets();
    // to get current location of user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }

    // to get current location of driver
    this._apiService.userLocationChanged()
      .subscribe(data => {
        this.lat = data.latitude;
        this.lng = data.longitude;
      });
  }

  getFleets() {
    this._apiService.getFleets().subscribe((res) => {
      this.fleets = res.fleets ? res.posts : [];
    }, (err) => {
      console.log('Error while fetching fleets', err);
    });
  }
  searchData() {
    if (this.searchText !== '' || this.searchText !== undefined) {
      this.searchText = this.searchText.trim();
      this.fleets = this.fleets.filter((ele) => {
        return ((ele.id.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1) ||
          (ele.name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1) ||
          (ele.currentPlace.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1));
      });
    }
  }

  trackUserLocation(fleet) {
    this._apiService.trackUserLocation({id:fleet.id});
  }

}
