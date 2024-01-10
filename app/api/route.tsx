import { NextRequest, NextResponse } from 'next/server'
import Image from "next/image";
import { useState } from "react";

export default async function Upload(files:Array<File>) {
    console.log('hu');
    console.log(files);
  // State to store the file
  
//   const [file, setFile] = useState<File | null>(null);

//   // State to store the base64
//   const [base64, setBase64] = useState<string | null>(null);

//   const a = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!file) {
//       return;
//     }

    for (const file of files){
        await upload_one(file)
    }

    


    // Clear the states after upload
    //setFile(null);
    //setBase64(null);
    //console.log(req);
    return;
 
}

async function upload_one(file: File){
    // Convert the file to base64
    let base64 = await toBase64(file) as String;

    let new_b64 = base64.split(",")[1];
    console.log(new_b64);

    // You can upload the base64 to your server here
    let stat  = 500;
    const res = await fetch("http://192.168.1.24:8000/json", {
      method: "POST",
      body: JSON.stringify({
          "metadata": {
            "username": "username",
            "file_ext": "jpeg"
          },
          "file": new_b64,
        }),
      headers: {
        "Content-Type": "application/json",
      },
      
    });  
    console.log(res.json);
}

// Convert a file to base64 string
const toBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
  
      fileReader.readAsDataURL(file);
  
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
  
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
};

