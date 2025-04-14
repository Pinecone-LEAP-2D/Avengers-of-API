import axios from "axios";

export const fetchProfile = async (id:Number) => {
    try{
        const response = await axios.get(`http://localhost:3000/profile/?userId=${id}`);
        console.log(response);
        
    }catch(err){
        return "No profile";
    }
}