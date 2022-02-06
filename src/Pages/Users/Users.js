
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import '../Users/Users.css'


function Users({items}){
  const[userData,setuserData]=useState([])
  const navigate=useNavigate()
  const[newArr,setNewArr]=useState([])
  const[deletes,setDeletes]=useState({display:"none",minWidth:"500px",maxWidth:"700px"})
  const[delind,setDelind]=useState()
  const[empty,setEmpty]=useState({display:"none"})
 


  useEffect( ()=>{
    fetch(  "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data")
  .then(response => response.json())
  .then(json => {console.log(json)
    let comp=localStorage.getItem('newusersArr')
    let compitems=JSON.parse(comp)
    console.log(compitems)
   
          comp===null ? setuserData(json) :  setuserData(compitems)
            
             console.log(userData)
          
  })
  
    console.log(items) 
   
    
    
    },[]);
  
    function handledelete(val,ind){
      fetch("https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data",
      {method: 'DELETE' })
  
      .then((resp) => resp.json())
      .catch((err)=>{
        console.log(err)
      })

     
      userData.forEach((delitem,index)=>{
        
        if(delind===index){
         
        console.log(delitem)

       
        setNewArr(userData)
        userData.splice(index,1)
      
      console.log(userData)
      
      
        localStorage.setItem('newusersArr',JSON.stringify(userData))
        let compSec=localStorage.getItem('newusersArr')
        let compitemsSec=JSON.parse(compSec)
        setuserData(compitemsSec)
        
        console.log(newArr)
        setDeletes({display:"none"})
        
        
        }
       

      })
      if(userData.length===0){
        setEmpty({display:"inline"})
      }

    }
    


   
      return(
        <div className="main-user-container">
          <div className='prompt-box' style={empty}>
            <p>No more user on the list!</p>
            <button onClick={(()=>{setEmpty({display:"none"})})}>Ok</button>
            </div>
          <div className='prompt-box' style={deletes}>
            <p>Are you sure you want to delete this user? </p>
            <button  className="canceldel" onClick={(()=>{setDeletes({display:"none"})})}>Cancel</button>
           
            <button className="cancelcont" onClick={((e)=>{handledelete()})}>Delete</button>
           
          </div>
          <h2>Dashboard</h2>
          <div className='dash-sub-heading'>
            <h2>User List</h2>
            <button className="addbutton" onClick={(()=>{navigate("/newuser")})}>Add new</button>
          </div>
       
        <table>

<thead className="thead">
     <tr>
       <th>Id</th>
      <th>Name</th>
     <th>Username</th>
      <th>City</th>
     <th>Email</th>
   </tr>
  </thead>
  {userData.map((val,ind)=>{
    return(
    
     
      <tbody key={val.id}>
            <tr >
      <td className='tre'>{val.id}</td>
      <td>{val.name}</td>
     <td>{val.username}</td>
     <td>{val.address.city}</td>
     <td>{val.email}</td>
    
     
      
     
      <td>
      <button id="cancelbutn" onClick={(()=>{navigate(`/edit/${val.id}`)})}>Edit</button>
     <button  className="deletebutn" onClick={(()=>{setDeletes({display:'inline',width:'600px'});setDelind(ind)})}>Delete</button>
     </td>
     </tr>
     </tbody>
      
    
    )

  })}
        </table>
        </div>

  


        
      )
   

}
const mapstatetoprops=({task:{items}})=>({
 
  items
 
 

})


export default connect(mapstatetoprops) (Users)