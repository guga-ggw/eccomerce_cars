import { createAsyncThunk } from "@reduxjs/toolkit"

export const getCarInfo = createAsyncThunk(
    '/Cars/GET',
    async(_, ThunkApi) => {
        try{
            const res = await fetch('/api/v1/cars',{
                headers :{
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer 3KxFkJOzPOPvjcj3rXMqFDJEuzDCvof41VEgGumFMN-o7aWJaQ`
                }
            })
            console.log(res)
            const data = await app.use(res.json())
            console.log(data)
            if(data) return ThunkApi.fulfillWithValue(data)
        }catch{
            console.log('eror')
            return ThunkApi.rejectWithValue('something went wrong')
        }
    }

)

export const createcarCard = createAsyncThunk(
    '/Cars/POST',
    async (body, ThunkApi) => {
      console.log(JSON.stringify(body))
      try {
        const res = await fetch('/api/v1/cars',{
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer 3KxFkJOzPOPvjcj3rXMqFDJEuzDCvof41VEgGumFMN-o7aWJaQ`,
          },
           body: JSON.stringify(body) 
        });
        console.log(res)
  
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
  
        const data = await res.json();
        return ThunkApi.fulfillWithValue(data); 


      } catch (error) {
        console.error('Error:', error);
        throw error; 
      }
    }
  );
  