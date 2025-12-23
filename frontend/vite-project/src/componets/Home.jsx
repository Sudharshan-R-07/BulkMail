import React, { useState } from "react"
import axios from "axios"
import * as XLSX from "xlsx"
const Home = () => {

    const [msg,setmsg]=useState("")
    const [status,setstatus]=useState(false)
    const [emaillist,setemail]=useState([])

    function handlemsg(e){
        setmsg(e.target.value)
    }
    function handlefile(event){
          const file=event.target.files[0]

    const reader=new FileReader();
    reader.onload=function(event){
        const data=event.target.result
        const workbook=XLSX.read(data,{type:"binary"})
        const sheetName=workbook.SheetNames[0]
        const worksheet=workbook.Sheets[sheetName]
        const emaillist=XLSX.utils.sheet_to_json(worksheet,{header:'A'})
        const totalemail=emaillist.map(function(item){return item.A})
        console.log(totalemail)
        setemail(totalemail)
    }

    reader.readAsBinaryString(file);

    }

    function send(){
        setstatus(true)
        axios.post("https://bulkmail-1-l21v.onrender.com",{msg:msg,emaillist:emaillist})
        .then(function(data){
            if(data.data===true){
                alert("Email Send Success")
                setstatus(false)
            }
            else{
                alert("Failed")
            }
        })
    }
    return (
        <div>
            <div className="bg-blue-950 text-white text-center">
                <h1 className="text-2xl font-medium px-3 py-3 ">Bulk Mail</h1>
            </div>
            <div className="bg-blue-600 text-white text-center">
                <h1 className="text-xl font-medium px-3 py-3 ">We can help you sending multiple mails in your bussiness</h1>
            </div>
            <div className="bg-blue-600 text-white text-center">
                <h1 className="text-xl font-medium px-3 py-3 ">Drag and Drop</h1>
            </div>
            <div className="bg-blue-400 flex flex-col items-center text-black px-5 py-3">
                <textarea onChange={handlemsg} value={msg} className="w-[80%] h-32 py-2 outline-0 border border-black rounded-md" placeholder="Enter the email text"></textarea>

                <div className="">
                    <input type="file" onChange={handlefile} className="border-4 border-dashed border-white py-4 px-4 mt-5" ></input>
                    <p className="mt-5 text-center">Total Email in this file :{emaillist.length}</p>
                    <button onClick={send} className="bg-blue-950 px-2 py-2 text-white font-medium rounded-md w-full cursor-pointer">
{status?"Sending...":"Send"}
                    </button>
                </div>
            </div>
            <div className="bg-blue-300 text-white text-center p-16">
            </div>
            <div className="bg-blue-200 text-white text-center p-16">
        
            </div>
        </div>
    )

}


export default Home