let entry=[]
let compines=[]
let current

function addCompiney(){
    document.getElementById('enterCompiny').style.display = "flex";
}
function hideCompiney(){
    document.getElementById('enterCompiny').style.display = "none";
}
function register(){
    let name =document.getElementById('compinyName').value

    if(name){
        if(compines.map(x=>x.name)!=name){
            
            compines.push({'name':name,'entry':entry,'total':0})
            // console.log()
            let data=document.getElementById('compines')
            const newField = document.createElement("div")
            newField.classList.add("compinyStyle") // style compiny
            newField.innerHTML=`<h4>${name}<h4><div>${compines.filter(x=>x.name==name).map(x=>x.total)}<div>`
            // newField.document.createElement('p').textContent=compines.map(x=>x.name).total
            data.appendChild(newField)
            hideCompiney()
            document.getElementById('compinyName').value=''
        
        }
        
    }
}