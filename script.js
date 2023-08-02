
let compines=[]
let current
window.onload = function() {
    registerMode()
    removeEntry()
    // hideCompiney()
}
function registerMode(){
    // document.getElementById('regster').style.display = "flex";
    // document.getElementById('setelment').style.display = "none";
    document.getElementById('regster').classList.add("showRegister")
    document.getElementById('setelment').classList.add('hide')
    document.getElementById('regster').classList.remove("hide")
    document.getElementById('setelment').classList.remove('showSetelment')
}
function setelmentMode(){
    document.getElementById('regster').classList.add("hide")
    document.getElementById('setelment').classList.add('showSetelment')
    document.getElementById('regster').classList.remove("showRegister")
    document.getElementById('setelment').classList.remove('hide')
    // document.getElementById('regster').style.display = "none";
    // document.getElementById('setelment').style.display = "flex";
}
function addCompiney(){
    document.getElementById('enterCompiny').classList.add("EnterCom")
    document.getElementById('enterCompiny').classList.remove("hide")
}
function hideCompiney(){
    document.getElementById('enterCompiny').classList.add("hide")
    document.getElementById('enterCompiny').classList.remove("EnterCom")
}
function register(){
    let name =document.getElementById('compinyName').value

    if(name){
        if(compines.map(x=>x.name)!=name){
            
            compines.push({'name':name,'entry':[],'total':0})
            // console.log()

            let data=document.getElementById('compines')
            let message=`<div class="compinyStyle" onClick=selectOp(this)>
                            <h4>${name}<h4>
                            <div>${compines.filter(x=>x.name==name).map(x=>x.total)}</div>
                         </div>`
                          
            data.insertAdjacentHTML("beforeend",message)
            hideCompiney()
            document.getElementById('compinyName').value=''
        }
        
    }
}
function selectOp(data){
    current=data.querySelector('h4').innerText
    document.getElementById('customer').innerHTML=`<button onclick="home()"><</button><h2>${current}</h2>`
    setelmentMode()
    // hideCompiney()
    
}
function addEntry(){
    document.getElementById('entryDet').classList.add("EntryDet")
    document.getElementById('entryDet').classList.remove('hide')
    console.log('clicking')
}
function removeEntry(){
    document.getElementById('entryDet').classList.remove("EntryDet")
    document.getElementById('entryDet').classList.add('hide')
}
function submitEntry(state){
    
    let index=compines.map(x=>x.name).indexOf(current)
    let remark=document.getElementById('remark').value
    let amount=parseInt(document.getElementById('amount').value)
    console.log(current)
    console.log(index)
    if(state<0)
        amount=amount*-1
    compines[index].entry.push({'remark':remark,'amount':amount})
    compines[index].total+=amount
    
    let message
    if(amount>=0){
        message =`<div class='element_feature'>
                   <div class="label">${remark}</div>
                    <div class="amount moneyGet">${amount}</div>
                 </div>`
    }else{
        message =`<div class='element_feature '>
                    <div class="label">${remark}</div>
                    <div class="amount moneyGot">${-1*amount}</div>
                 </div>`
    }
    document.getElementById('Entry').insertAdjacentHTML("beforeend",message)
    if(compines[index].total>=0){
        document.getElementById('result').innerHTML=`<div>You will get</div> <p class="moneyGet">${compines[index].total}</p>`
    }else{
        document.getElementById('result').innerHTML=`<div>You will got</div> <p class="moneyGot">${-1*compines[index].total}</p>`
    }
    removeEntry()
    
}
function home(){
    registerMode()
    removeEntry()
}