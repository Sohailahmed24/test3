import axios from "axios"
import { useEffect } from "react"



const App=()=>{

    useEffect(()=>{
       // getApi()
        headAPI()
    },[])

    const getApi=async()=>{
      //  const {data}= await axios.get("http://localhost:4000/api/noon")
       // const {data} =await axios.get("https://backend-zeta-brown-74.vercel.app/https://food.noon.com/_svc/mp-food-api-catalog/api/")
        
       console.log("api calling")

        console.log(data ,"data")
    }

    const headAPI=async()=>{
   const {data}=  await axios.post("http://localhost:4000/https://food.noon.com/_svc/mp-food-api-mpnoon/consumer/restaurant/outlet/details/guest"
            ,{
                outletCode: "LMDHRSKJCW",
             
            },{
            headers:{
                "Content-Type":"application/json",
                "Authorization":" _API_KEY_HERE"
            }
        })
        console.log(data)
    }
    return(
        <div>
            <h1>app</h1>
        </div>
    )
}

export default App