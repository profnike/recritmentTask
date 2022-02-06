
import { useEffect,useState } from 'react';
import { useNavigate,useLocation,  } from 'react-router-dom';
import  {editoldval} from '../../redux/task/task.actions'
import { connect } from 'react-redux';
import '../Edit/Edit.css'


function Edit({editoldval,newinputval}){
  const navigate=useNavigate()
  const location=useLocation()
  const[email,setEmail]=useState("")
  const[name,setName]=useState("")
  
  
  const[username,setUsername]=useState("")
  const[city,setCity]=useState("")
  const[id,setId]=useState()
  
  const [userData,setUserData]=useState([])
 
  let locat;
  let newArr=[]
 
        locat= location.pathname.split("/")[2]
        
      
        
  
       
       
       locat= location.pathname.split("/")[2]
        
        useEffect( ()=>{
          fetch(  "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data")
        .then(response => response.json())
        .then(json => {console.log(json)
         
         
            
              let comp=localStorage.getItem('newusersArr')
              let compitems=JSON.parse(comp)
              comp===null ? newArr=json :  newArr= compitems
                   console.log(userData)
               
               setUserData(newArr)
                console.log(newArr)
                console.log(newArr) 
               
               
                newArr.forEach((val,ind)=>{
                 
                   
                   if(val.id===+locat){
                    console.log(+locat)
                    console.log(val.id)
                  
                    setName(val.name)
                   setEmail(val.email)
                 setUsername(val.username)
                 setId(val.id)
                  setCity(val.address.city)
                   }})
              
        })
        
       
          
          },[]);
 
  
   
   
   
   
    function handlecancel(){

       
      navigate("/")

  }
  function handlesubmit(){
    fetch("https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data",
      {method: 'PATCH' })
  
      .then((resp) => resp.json())
      .catch((err)=>{
        console.log(err)
      })
    userData.forEach((val,ind)=>{
      console.log(val.id)
      console.log(locat)
      if(val.id===+locat){
       
       editoldval({name:name,email:email,address:{city:city},username:username,id:id})
       console.log(newinputval)
      
       userData.splice(ind,1,newinputval)
       localStorage.setItem('newusersArr',JSON.stringify(userData))
       navigate("/")
      

       }


    })


  }
  
    return(
    
      

           
            <div className='form-div-edit'>
            <h2>Dashboard</h2>
               <form className="form">
            <div >
            <label  >Name</label>
            <input type="text" name="name" value={name} placeholder="" onChange={(e)=>{setName(e.target.value)}} required/>
            </div>
           
            <div>
            <label    >Email</label>
           
            <input type="email" name="email" value={email}  placeholder="" onChange={(e)=>{setEmail(e.target.value);}}  required/>
            </div>
            <div>
            <label    >City</label>
           
            <input type="text" name="city" value={city}  placeholder="" onChange={(e)=>{setCity(e.target.value);}}  required/>
            </div>
            <div>
            <label    >Username</label>
           
            <input type="text" name="username" value={username}  placeholder="" onChange={(e)=>{setUsername(e.target.value);}}  required/>
            </div>
          
            <div className="buttons-canc-del">
               <button className='first-cancel-butn' onClick={handlecancel}>Cancel</button>
                <button className='first-sub-butn' onClick={handlesubmit}>Submit</button>
            </div>
            </form>
              </div>
           
           )

          }
           const MapDispatchToProps=(dispatch)=>({

    
    
            editoldval:(item)=>dispatch(editoldval(item))
        
        })       
           
        const mapstatetoprops=({task:{newinputval}})=>({
 
          newinputval
          
         
         })
         

    



export default connect (mapstatetoprops,MapDispatchToProps) (Edit)
