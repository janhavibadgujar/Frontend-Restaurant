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
 // open: any = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'] ;
  //openingminList:any =[];
  //close: any = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'] ;

  restaurant_id:any;
  registration_msg_status=false;
  open: boolean= true;
  registration_message:any;
  timingstatus= false;
  constructor(private restaurantService: RestaurantServiceService, private router:Router) { }

  ngOnInit(): void
   {
  }

  formData = new FormData(); 
  

  addRestaurant(form:any)
  {
    try
    { 
      var opens= Number(form.restaurant_opening_hours);
      var closes= Number (form.restaurant_closing_hours);
      if(opens <= closes)
      { this.timingstatus=true;
     // form.openinghrs1
      const restaurant={
        name : form.restaurant_name,
        address: form.restaurant_address,
        openinghrs : form.restaurant_opening_hours,
        closinghrs: form.restaurant_closing_hours
      }
     // const openingTimeArray = restaurant.openinghrs.split(":");
     // console.log(openingTimeArray);
      //console.log(openingTimeArray[0]);
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
    else
    {
        this.open = false;
      console.log("Cant enter");
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
