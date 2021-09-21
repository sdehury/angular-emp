import { Component ,OnInit} from '@angular/core';
// import { document} from '@angular/common';
import { FormBuilder, FormControl, FormGroup, MinLengthValidator, NumberValueAccessor, Validators } from '@angular/forms';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})

export class AppComponent implements OnInit {
employees:any[]=[]
name="Gopichand"
newemp={
  name:String,
  id:String,
  desg:String,
  salary:String,
  bonus:String,
  _id:String,
  totalsal:123,
}
employee={
  name:String,
  id:String,
  desg:String,
  salary:String,
  bonus:String,
  totalsal:112,
}
popup:boolean=false;
enableedit:boolean=false;

  constructor(private FB:FormBuilder , private service:SharedService) { 
  }
  // Empdtls=this.FB.group({
  //   name:['',[Validators.required,
  //   Validators.minLength(5)]],
  //   desg:['',Validators.required],
  //   salary:['',Validators.required],
  //   id:['',Validators.required],
  //   bonus:['',Validators.required],
  //   totalsal:['',Validators.required],
  // })
  Editedform=this.FB.group({
    name:['',[Validators.required,
    Validators.minLength(5)]],
    desg:['',Validators.required],
    salary:['',Validators.required],
    id:['',Validators.required],
    bonus:['',Validators.required],
  })
  ngOnInit(){
    console.log("Welcome");
    console.log(this.employee_list());
  }

  employee_list(){
  this.service.getemp().subscribe(
    res=>{
    this.employees=res;
    console.log("res check",this.employees);
    for(let i of this.employees)
    {
      i.totalsal= parseInt(i.salary) + parseInt(i.bonus)
    }
    console.log(res.length);

    if(res.length===0){
      this.employees=[
        { id:12345,name:"Gopichand",desg:"PAT",salary:30000,bonus:3333,totalsal:33333,},
        { id:45663,name:"Vaishnav",desg:"PA",salary:25000,bonus:2000, totalsal:27000}
      ]
    }
    },
  err=>{
    console.log("Error is",err);
    // if(err){
    //   this.employees=[
    //     { id:12345,name:"Gopichand",desg:"PAT",salary:30000,bonus:3333,totalsal:33333,},
    //     { id:45663,name:"Vaishnav",desg:"PA",salary:25000,bonus:2000, totalsal:27000}
    //   ]
    // }
  })
   console.log(this.employees);
  return this.employees
  }

add(data?:any){
  this.popup=true;
}
edit(emp?:any){
  this.newemp=emp;
  this.editform=emp;
  console.log("Edit this emp",this.newemp);
  this.indexedit=this.employees.indexOf(emp)
  this.enableedit=true;
  console.log('Check',emp);
  if(emp){
  this.editemp=true;
  // document.getElementById("savebtn").innerHTML='Save Edit';
    this.Editedform.patchValue({
      name:emp.name,
      id:emp.id,
      salary:emp.salary,
      bonus:emp.bonus,
      desg:emp.desg
    })

  }
else{
  this.editemp=false;
  this.Editedform.reset()
}
}
save(){
  if(this.newemp==undefined){
    console.log('IN EMP SAVE BLOCK');
    
    this.Editedform.reset;
  this.service.saveEmp(this.Editedform.value).subscribe
  (
    res=>{console.log("From server",res);},
    err=>{console.log("From Server",err);
    }
  )
  this.Editedform.value.totalsal= parseInt(this.Editedform.value.salary) + parseInt(this.Editedform.value.bonus);
  this.employees.push(this.Editedform.value)
  this.popup=false;
  this.enableedit=false;
  }
  else if(this.newemp!==undefined)
  {
    console.log("In Emp Edit Block");
    
    this.service.editemp({_id:this.newemp._id,values:this.Editedform.value}).subscribe
  (
    res=>{console.log('Edit Succcess',res);
    },
    err=>{console.log("Error in edited emplyoee");}
  )
  this.employees.splice(this.indexedit,1)
  this.Editedform.value.totalsal= parseInt(this.Editedform.value.salary) + parseInt(this.Editedform.value.bonus);
  this.employees.push(this.Editedform.value)
  this.enableedit=false;
  }
}
cancel(){
  this.popup=false;
  this.enableedit=false;
}
indexedit:any;
editform:any;
editemp:boolean=false;

saveedit(){
  // console.log('Edited Form',this.Editedform.value);
  this.service.editemp({_id:this.newemp._id,values:this.Editedform.value}).subscribe
  (
    res=>{console.log('Edit Succcess',res);
    },
    err=>{console.log("Error in edited emplyoee");}
  )
  this.employees.splice(this.indexedit,1)
  this.Editedform.value.totalsal= parseInt(this.Editedform.value.salary) + parseInt(this.Editedform.value.bonus);
  this.employees.push(this.Editedform.value)
  this.enableedit=false;
}
delete(emp:any){
 let ind=this.employees.indexOf(emp)
  this.service.delemp(emp._id).subscribe(
    res=>{console.log('deleted successfully',res);},
    err=>{console.log('Error occured',err);}  
  )

  let index=this.employees.indexOf(emp)
   this.employees.splice(ind,1)
   console.log('List is',this.employees);
  
}




Fname:any
search(){
  console.log("Search Element:",this.Fname);
 let x= this.Fname.toLocaleLowerCase();
if(this.Fname='')
{
  this.ngOnInit()
}
else{
  let srchemployees=this.employees.filter(res=>{
  return res.name.toLocaleLowerCase().includes(x)
  })
  if(srchemployees.length==0){
    console.log('No such employee found');
    
  }else{
    this,this.employees=srchemployees;
  }
  console.log('From Search',this.employees);
  
}
}
}


