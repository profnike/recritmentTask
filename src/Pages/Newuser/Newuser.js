

import { connect } from 'react-redux'
import { editval } from '../../redux/task/task.actions'

import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Newuser.css'


function Newuser({inputval,editval,items}){
    const[userData,setUserData]=useState([])
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[city,setCity]=useState("")
    const[username,setUsername]=useState("")
    const [error,setError]=useState({display:"none"})
   
    let navigate=useNavigate()
    let newArr=[]
   
    let lastNum
    useEffect( ()=>{
        fetch(  "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data")
      .then(response => response.json())
      .then(json => {console.log(json)
       
       
            //   items.length===0 ? setUserData(json) :  setUserData(items)
            let comp=localStorage.getItem('newusersArr')
            let compitems=JSON.parse(comp)
            // comp===null ? setUserData(json) :  setUserData(compitems)
            
            comp===null ? newArr=json :  newArr=compitems
            setUserData(newArr)
                 console.log(userData)
            //   newArr
             
              console.log(newArr)
            
      })
      
        console.log(items)   
        
        
        },[]);
   
    function handlesubmit(){
        if(name===""||email===""){
            
           setError({display:"inline"})
        }
        else{
       
        let newvals;
        let params={
            name:name,
            email:email,
            city:city,
            username:username,
            id:newvals


        }
      
        fetch("https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data",
        {method: 'POST',
     body:JSON.stringify(params)})
        .then((resp) => resp.json())
        .catch((err)=>{
            console.log(err)
          })
         
       
        
        
        if(userData.length===0){
             
               newvals=1
    
           }
       else{ lastNum=userData.length-1
       let Lastid=userData[lastNum]
        console.log(Lastid.id)
        newvals=Lastid.id+1
       console.log(newvals)
    }
        newArr=userData
        console.log(inputval)
        editval({id:newvals,email:email,name:name,address:{city:city},username:username})
        newArr.push(inputval)
        setUserData(newArr)
        console.log(newArr)
        localStorage.setItem('newusersArr',JSON.stringify(newArr))
        navigate("/")
    }

    }
    function handlecancel(){

       
        navigate("/")

    }
        return(
            <div className="input-area">
                <h2>Dashboard</h2>
                
            <div  style={error}>
                <div className='prompt-box'>
            <p>Fill in your name/email address!</p>
            <button onClick={(()=>{setError({display:"none"})})}>Ok</button>
            </div>
            </div>
        <form className="form">
            <div >
            <label  >Name</label>
            <input type="text" name="name" placeholder="" onChange={(e)=>{editval({name:e.target.value});setName(e.target.value)}} required/>
            </div>
            <div>
            <label    >Email</label>
           
            <input type="email" name="email"  placeholder="" onChange={(e)=>{setEmail(e.target.value)}}  required/>
            </div>
            <div>
            <label    >Username</label>
            <input type="text" name="name"  placeholder="" onChange={(e)=>{setUsername(e.target.value)}}  />
            </div>
            <div>
            <label    >City</label>
            <input type="text" name="city"  placeholder="" onChange={(e)=>{setCity(e.target.value)}}  />
            </div>
            <div className='newuser-button'>
               <button className='new-user-cancel' onClick={handlecancel}>Cancel</button>
                <button className='new-user-submit' onClick={handlesubmit}>Submit</button>
            </div>
        </form>
        </div>
        )
   
}
const MapDispatchToProps=(dispatch)=>({

    
    
     editval:(item)=>dispatch(editval(item))
 
 })
 const mapstatetoprops=({task:{inputval,items}})=>({
 
   inputval,
   items
   
  
  })
  

export default connect(mapstatetoprops,MapDispatchToProps) (Newuser)