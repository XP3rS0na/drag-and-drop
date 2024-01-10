import { NextRequest, NextResponse } from "next/server";


export async  function POST(request: NextRequest) {
    //-----Treat data from request---------------------------------------------------------------
      const { file_name, result } = await request.json();
        console.log(file_name, result);
    //-----Connect to DB and insert Document-----------------------------------------------------
     
        return NextResponse.json( {status : 200});
      } 
      
      
    
    