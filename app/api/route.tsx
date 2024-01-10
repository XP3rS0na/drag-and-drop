export default async function upload_one(file: File){

    let base64 = await toBase64(file) as String;  // Convert the file to base64
    let new_b64 = base64.split(",")[1]; // Trim the metadata in b64 string
    let ext = file.name.split(".").at(-1); // Trim file name to to get the extension

    // You can upload the base64 to your server here
    let stat  = 500;
    let data = await fetch("http://192.168.1.24:8001/json", {
      method: "POST",
      body: JSON.stringify({
          "metadata": {
            "username": "username", // You can set up the user data 
            "file_ext":  ext
          },
          "file": new_b64,
        }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
        
        return res.json();
    }).then((data) => {
        return data;
    });  
   
    async function sendDB(data: any) {
      const apiEndpoint = '/api/db';
      let status  = 500;
      await fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((response) => {
          status = response.status;
        })
        .catch((err) => {
          console.log("error");
        });
      return status;
    }
    sendDB(data);
    
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
