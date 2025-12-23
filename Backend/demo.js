const fileInput=document.getElementById("fileinput");

fileInput.addEventListener("change",function(event){
    const file=event.target.files[0]

    const reader=new FileReader();
    reader.onload=function(event){
        const data=event.target.result
        const workbook=XLSX.read(data,{type:"binary"})
        const sheetName=workbook.SheetNames[0]
        const worksheet=workbook.Sheets[sheetName]
        const emaillist=XLSX.utils.sheet_to_json(worksheet,{header:'A'})
        console.log(emaillist)
    }

    reader.readAsBinaryString(file);
})
