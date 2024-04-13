import axios from "axios";         
import { useEffect, useState } from "react"
                
const App = ()=> {   

  const [inputData,setInputData] = useState('');
  const [getData,setGetData] = useState([]);    
  const [refresh,setrefresh] = useState(false);

  useEffect(()=>{
    try {
     axios.get('http://localhost:8080/api/gettodo').then((res)=>{
      console.log("res",res.data.data);
      setGetData(res.data.data)
      }).catch((err)=>{
        console.log(err)  
      })
    } catch (error) {
      console.log("error",error)  
    }
  },[refresh])

  const createTodo = async()=>{
    try {
      let obj = {    
        todo:inputData,
      }
      const response = await axios.post('http://localhost:8080/api/addtodo',obj);
      console.log("response",response) 
      setrefresh(!refresh)     
    } catch (error) {
      console.log("error",error)
    }
  }
  
  const deleteTodo = (id)=>{
    try {
      axios.delete(`http://localhost:8080/api/deletetodo/${id}`).then((res)=>{
        console.log(res)   
      setrefresh(!refresh) 

      })
    } catch (error) {
      console.log(error)
    
    }   
  } 

  const editTodo = (id)=>{
    try {
      var editInput = prompt("enter value...");

      let obj = {
        todo:editInput,
        id:id
      }
      axios.put(`http://localhost:8080/api/updatetodo`,obj).then((res)=>{
        console.log(res)
      setrefresh(!refresh) 

      })
    } catch (error) {
      console.log(error)
    
    }   
  }
  return (
    <div style={{textAlign:"center"}}>
      <h1>Todo Application</h1>

      <input type="text" onChange={(e)=>setInputData(e.target.value)}/>
      <button onClick={createTodo}>Create todo</button>

      <div>
          {
            getData.map((e,i)=>{
              return <ul key={i}>
                  <li>{e.todo} <button onClick={()=>editTodo(e._id)}>EDIT</button><button onClick={()=>deleteTodo(e._id)}>DELETE</button></li>
                </ul>
            
            })
          }
      </div>

    </div>
  )
}

export default App
