import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Params} from '@angular/router';
import { RestaurantServiceService } from '../restaurant-service.service';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css']
})
export class RegisterProductComponent implements OnInit {
  r_id:any;
  restaurant_name:any;

  constructor(private restaurantService:RestaurantServiceService,private router:ActivatedRoute) { }

  ngOnInit(): void
   {
    this.router.params.subscribe(
      (params:Params)=>
      {
        this.r_id=params['id'];
      })
      this.getProducts();
   }

   products=[];
   registration_status=false;
   formData = new FormData(); 
   registration_message:any;
  prod_registrationBTN_text="Add Dish";
  show_prod_reg=false;
  display_prod_registration()
  {
    this.show_prod_reg=!this.show_prod_reg;
    this.prod_registrationBTN_text=!this.show_prod_reg?"Add Dish ":"Dont Add";
  }


   price:Number=0;
  addProduct(form:any)
  {
    try
    {
      const product={
        pname : form.product_name,
        price : form.product_price,
        category: form.product_category
      }
        this.restaurantService.addProduct(product,this.r_id)
      .subscribe(
        resp=>{
        if(resp)
        {
          this.registration_status=true;
          let dataJson = JSON.parse(JSON.stringify(resp))
          this.registration_message=dataJson.msg;
          this.getProducts();
          console.log("data saved successfully",resp);
        }else
        {
          console.log("data not saved",resp);
        }
        });  
    }
    catch(e)
    {
      console.log("there is an error");
    }
    
  }
   temp:any;

getProducts()
{
  try {
    this.restaurantService.getProducts(this.r_id)
    .subscribe(
      (products:any)=>{
       if(products)
       {
         this.temp=products;
         this.restaurant_name=products[0].name
         this.prods=this.temp[0].products;
       }else
       {
         console.log("data not saved",products);
       }

      }
    );  
  } catch (error) {
    console.log("there is an error");
  }
}
show_products=true;
dispaly_productBTN_text="View Dish"
register_products:any;
prods:any
display_products()
{
  this.show_products=!this.show_products;
  this.dispaly_productBTN_text=!this.show_products?"View Dish":"Hide"
  this.getProducts();
}

//Deletion of Product
   deletion_message:any;
delete_msg_status=false;
delete_product(p_id:any)
{ 
  try {
    this.restaurantService.deleteProduct(this.r_id,p_id)
    .subscribe(
      (resp:any)=>{
        if(resp)
        {
          this.delete_msg_status=true;
          let dataJson = JSON.parse(JSON.stringify(resp))
          this.deletion_message=dataJson.message;
          console.log("Data saved successfully",resp);
          this.getProducts();
        }else
        {
          console.log("data not saved",resp);
        }
      }
    );  
  } catch (error) {
    console.log("there is an error");
  }
}

}
