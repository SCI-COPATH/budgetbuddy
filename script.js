
let compines=[]
let current
let mode=0
window.onload = function() {
    // localStorage.clear()
    compines= JSON.parse(localStorage.getItem('allData'))!=null?JSON.parse(localStorage.getItem('allData')):compines;
    current= JSON.parse(localStorage.getItem('current'))!=null?JSON.parse(localStorage.getItem('current')):current;
    mode= JSON.parse(localStorage.getItem('mode'))!=null?JSON.parse(localStorage.getItem('mode')):mode;
    console.log(compines)
    console.log(current)
    console.log(mode)
    if(mode==0){
        registerMode()
        removeEntry()
        hideCompiney()
        
        loadHome()                
        // 

    }else{
        removeEntry()
        loadEntry()

        setelmentMode()

    }
    // hideCompiney()
}
oruForm=document.getElementById('enterCompiny');
oruForm.addEventListener("submit",(e) => {
    e.preventDefault()
    // console.log(inputObj.value)
    register() 
})
function loadHome(){
    let data=document.getElementById('compines')
    let message
    data.innerHTML=''
    compines.forEach(element => {
        if(element.total>=0){
             message=`<div class="compinyStyle" onClick=selectOp(this)>
                    <h4>${element.name}<h4>
                    <div class=moneyGet>${element.total}</div>
                    </div>`
        }else{
            message=`<div class="compinyStyle" onClick=selectOp(this)>
            <h4>${element.name}<h4>
            <div moneyGot>${element.total}</div>
            </div>`
        }
        data.insertAdjacentHTML("afterbegin",message)
    });
}
function loadEntry(){
    let index=compines.map(x=>x.name).indexOf(current)
        console.log(index)
        document.getElementById('customer').innerHTML=`<button onclick="home()"><</button><h2>${current}</h2>`

        if(compines[index].total>=0){
            document.getElementById('result').innerHTML=`<div>You will get</div> <p class="moneyGet">${compines[index].total}</p>`
        }else{
            document.getElementById('result').innerHTML=`<div>You will got</div> <p class="moneyGot">${-1*compines[index].total}</p>`
        }
        let message
        document.getElementById('Entry').innerHTML=''
        compines[index].entry.forEach(element => {
           
            if(element.amount>=0){
                message =`<div class='element_feature'>
                           <div class="label">${element.remark}</div>
                            <div class="amount moneyGet">${element.amount}</div>
                         </div>`
            }else{
                message =`<div class='element_feature '>
                            <div class="label">${element.remark}</div>
                            <div class="amount moneyGot">${-1*element.amount}</div>
                         </div>`
            }
            document.getElementById('Entry').insertAdjacentHTML("afterbegin",message)
        });
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
                          
            data.insertAdjacentHTML("afterbegin",message)
            hideCompiney()
            document.getElementById('compinyName').value=''
            localStorage.setItem('allData', JSON.stringify(compines))
            localStorage.setItem('mode',JSON.stringify(mode))
            localStorage.setItem('current',JSON.stringify(current))
        }
        
    }
}
function selectOp(data){
    
    mode=1
    localStorage.setItem('mode',JSON.stringify(mode))
    current=data.querySelector('h4').innerText
    localStorage.setItem('current',JSON.stringify(current))
    document.getElementById('customer').innerHTML=`<button onclick="home()"><</button><h2>${current}</h2>`
    loadEntry()
    setelmentMode()
    
    // hideCompiney()
    
}
function addEntry(){
    document.getElementById('entryDet').classList.add("EntryDet")
    document.getElementById('entryDet').classList.remove('hide')
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
    document.getElementById('Entry').insertAdjacentHTML("afterbegin",message)
    if(compines[index].total>=0){
        document.getElementById('result').innerHTML=`<div>You will get</div> <p class="moneyGet">${compines[index].total}</p>`
    }else{
        document.getElementById('result').innerHTML=`<div>You will got</div> <p class="moneyGot">${-1*compines[index].total}</p>`
    }
    removeEntry()
    localStorage.setItem('allData', JSON.stringify(compines))
    localStorage.setItem('mode',JSON.stringify(mode))
    localStorage.setItem('current',JSON.stringify(current))

}
function home(){
    mode=0
    localStorage.setItem('mode',JSON.stringify(mode))
    loadHome()
    registerMode()
    removeEntry()
}