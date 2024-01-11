import { NextRequest, NextResponse } from "next/server";




export async  function POST(request: NextRequest) {
    //-----Treat data from request---------------------------------------------------------------
      const { fileName, alt,} = await request.json();
        console.log(fileName, alt);
   //-----Connect to DB and insert Document-----------------------------------------------------
     
        return NextResponse.json( {status : 200});
      } 
      
      
    
      