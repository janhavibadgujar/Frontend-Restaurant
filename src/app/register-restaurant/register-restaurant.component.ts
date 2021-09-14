import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantServiceService } from '../restaurant-service.service';

@Component({
  selector: 'app-register-restaurant',
  templateUrl: './register-restaurant.component.html',
  styleUrls: ['./register-restaurant.component.css']
})
export class RegisterRestaurantComponent implements OnInit {
  restaurants=[];
  restaurant_id:any;
  registration_msg_status=false;
  open: boolean= true;
  registration_message:any;
  
  constructor(private restaurantService: RestaurantServiceService, private router:Router) { }

  ngOnInit(): void
   {
  }

  formData = new FormData(); 
  

  addRestaurant(form:any)
  {
    try
    { console.log(form.input);
        const openingTimeArray = form.input.split(":");
        const closingTimeArray = form.output.split(":");
       console.log(typeof(parseInt(openingTimeArray[0])));
    
      var opens=(parseInt(openingTimeArray[0]));
      var closes=(parseInt(closingTimeArray[0]));
      var openmin=(parseInt(openingTimeArray[1]));
      var closemin=(parseInt(closingTimeArray[1]));
      if(opens > closes)
      {
        console.log("Hours");
        this.open= false;
        return;
      }
      else if(opens == closes)
      {
        if(openmin >= closemin)
        {
          console.log("Minutes");
          this.open= false;
          return;
        }
      }
      else
      { 
        var finalopen= (opens < 12) ? (form.input + " AM"):((opens-12) + ":" +(openmin)+" PM");
        var finalclose= (closes < 12 )? (form.output + " AM"):((closes-12) +":"+ (closemin)+ " PM");
      const restaurant={
        name : form.restaurant_name,
        address: form.restaurant_address,
        openinghrs : finalopen,
        closinghrs: finalclose
      }
    console.log(restaurant);
      this.restaurantService.addRestaurant(restaurant)
    .subscribe(
      resp=>{
          if(resp)
          {
            this.registration_msg_status=true;
            let dataJson = JSON.parse(JSON.stringify(resp))

            this.registration_message= dataJson.msg;
            this.restaurant_id=dataJson.rest_id;
            this.addProduct();   
           console.log("data saved successfully",resp);
          }else
          {
            console.log("Data not saved",resp);
          }
      }); 
    } 
   
  
  }
    catch(e)
    {
      console.log("An error");
    }
  }

  addProduct()
  {
   if(this.registration_message=="Restaurant Saved Successfully...")
   {
     this.router.navigate(['/add_product/'+this.restaurant_id]);
   }
  }

}
