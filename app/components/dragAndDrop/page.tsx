"use client";

import { useForm } from 'react-hook-form'
import { useRef, useState } from "react";
import upload_one from '@/app/api/upload/route';

export type FormData = {
  alt: string;
}

export default function DragAndDrop(){
  const { register, handleSubmit } = useForm<FormData>();
  let [status, setStatus] = useState(0);
  
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<any>(null);
  const [files, setFiles] = useState<any>([]);
 
  async function onSubmit(data: FormData) {
    if (!files) {
      console.log("plop");
    } else {
      console.log(data, "et", files);
      upload_one(files[0], data);
    }
    

  }

  function handleChange(e: any) {
    e.preventDefault();
    
    console.log("File has been added");
    handle_file_addition(e.target.files)
  }
  function handle_file_addition(fs: Array<File>){
   if (!fs) {
      console.log("File list is empty");
      return
    }
   
    
    let file = fs[0];
    const array = ["jpg","jpeg","png","svg","gif"];

    let name:any = file.name.split(".").at(-1);
    if (array.indexOf(name)> -1) {
      setFiles([file]);
    }
    else alert("Authorized extensions are .jpg, .jpeg, .png, .svg and .gif");
    }  

  function handleDrop(e: any) {
    e.stopPropagation();
    setDragActive(false);
    e.preventDefault();
    handle_file_addition(e.dataTransfer.files)
  }

  function handleDragLeave(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function removeFile(fileName: any, idx: any) {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles([]);
    setFiles(newArr);
  }

  function openFileExplorer() {
    inputRef.current.value = "";
    inputRef.current.click();
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className={`${
          dragActive ? "bg-blue-400" : "bg-blue-100"
        }  p-4 w-1/3 rounded-lg  min-h-[10rem] text-center flex flex-col items-center justify-center`}
        onDragEnter={handleDragEnter}
        onSubmit={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      >
        {/* this input element allows us to select files for upload. We make it hidden so we can activate it when the user clicks select files */}
        
        <input
          placeholder="fileInput"
          type="file"
          name="avatar"
          className="hidden"
          ref={inputRef}
          multiple={false}
          onChange={handleChange}
          accept=".jpg, .jpeg, .png, .svg, .gif" 
        />

        <p>
          Drag & Drop files or{" "}
          <span
            className="font-bold text-blue-600 cursor-pointer"
            onClick={openFileExplorer}
          >
            <u>Select files</u>
          </span>{" "}
          to upload
        </p>

        <div className="flex flex-col items-center p-3">
          {files.map((file: any, idx: any) => (
            <div key={idx} className="flex flex-row space-x-5">
              <span>{file.name}</span>
              <span
                className="text-red-500 cursor-pointer"
                onClick={() => removeFile(file.name, idx)}
              >
                remove
              </span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-5'>
          <label
            htmlFor='name'
            className='sm: mb-3 block text-base font-medium text-grey'
          >
            Describe your image
          </label>
          <input
            type='text'
            placeholder='Image of ...'
            className='w-full rounded-md  border border-gray-300 bg-white py-3 px-6 text-base font-medium text-gray-700 outline-none focus:border-4 focus:border-[#a5b4fc] focus:shadow-md'
            {...register('alt', { required: true })}
          />
        </div>
          <button
            className="bg-black rounded-lg p-2 mt-3 w-auto"
          >
            <span className="p-2 text-white">Submit</span>
          </button>
        </form>
      </div>
    </div>
  );
}