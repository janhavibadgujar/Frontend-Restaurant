import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { any } from 'sequelize/types/lib/operators';
import { RestaurantServiceService } from '../restaurant-service.service';

@Component({
  selector: 'app-restaurant-home',
  templateUrl: './restaurant-home.component.html',
  styleUrls: ['./restaurant-home.component.css']
})

export class RestaurantHomeComponent implements OnInit {
  
  show_restaurant= false;
  register_restaurants:any ;

  constructor(private restaurantService:RestaurantServiceService, private router: Router) 
  {

  }

  ngOnInit(): void 
  {

  }

  display_restaurant()
  {
    this.show_restaurant=true;

    try
    {
      this.restaurantService.getRestaurants().
      subscribe( restaurants => {
          if(restaurants)
          {
            this.register_restaurants=restaurants;
            console.log(this.register_restaurants);
          }
          else
          {
            console.log("Data not saved",restaurants);
          }
        }
      );
    } catch(error)
    {
      console.log("An error");
    }
  }

  add_products(restaurant_id:any)
{

 //console.log("--------------->",restaurant_id);
 
 this.router.navigate(['/add_product/'+restaurant_id]);
 
}

}
