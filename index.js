let employName = document.getElementById('employName');
let employId = document.getElementById('employId');
let date = document.getElementById('date');
let signIn = document.getElementById('signIn');
let signOut = document.getElementById('signOut');
let submitBtn = document.getElementById('submitBtn');
let employType = document.getElementById('employType');
let day = document.getElementById('day');
let vacation = document.getElementById('vacation');
let notes = document.getElementById('notes');
let offer = document.getElementById('offer');
let dayHours = document.getElementById('dayHours');
let workHours = document.getElementById('workHours');
let monthFilter = document.getElementById('monthFilter');
let monthPanel = document.getElementById('monthPanel');
// let totalEmployee = document.getElementById('totalEmployee')



let mood = 'create';
let tmp;

let employeesID ={
  Ahmed: 5555,
  Mohamed: 6666,
  Ali: 1111,
  Saad: 2222,
  Nirmeen: 3333,
  Noha: 4444
};
let employeesType ={
 Ahmed: 'GIS_QC',
  Mohamed: 'GIS_ANALYSIS',
  Ali: 'GIS_QC',
  Saad: 'GIS_QC',
  Nirmeen: 'GIS_ANALYSIS',
  Noha: 'GIS_ANALYSIS'
}

employName.addEventListener('change',function(){

    let name = employName.value;
    employId.value =employeesID[name];
    employType.value =employeesType[name];
    document.querySelector(" .welcome").innerHTML=name;
    document.querySelector('.welcome').style.color='#fff';

    // console.log(name , employId.value);
    
}) 


let dataTime;
if (localStorage.getItem('timesDate')){
    dataTime = JSON.parse(localStorage.getItem('timesDate'))
}
else{
    dataTime =[];
}

// submitBtn.addEventListener('click',function(){
//     // calculateHours();
//    let daysData={
//     // id: dataTime.length + 1,
//     id: mood === 'create' ? dataTime.length + 1 : dataTime[tmp].id,
//     date: date.value,
//     day: day.value,
//         employName: employName.value,
        
//         signIn: signIn.value,  
//         signOut: signOut.value,
//          workHours:workedDay,
//         dayHours:diff,
//         offer:offerTime,
//          employId: employId.value,
//          employName: employName.value,
//          notes: notes.value,
//         employType:employType.value,
//         // vacation: vacation.value,
//         vacation: signIn.value !== '' && signOut.value !== '' ? '' : vacation.value,

        
       
//     }
    
//      if (employName.value !== '' && date.value !== '' && (signIn.value !== '' || vacation.value !== '') ){
//          if (mood === 'create'){
//             let isDuplicate = dataTime.some(item => 
//             item.employName === employName.value && 
//             item.date === date.value
//         );
        
//         if(isDuplicate){
//             alert('This employee already has a record for this date!');
//             return; // ✅ بيوقف من غير ما يضيف
//         }
//              dataTime.push(daysData);
//                 //  dataTime.sort((a,b)=>new Date(a.date) - new Date(b.date));
//             syncToGoogleSheet(daysData, 'create'); // أرسل للجوجل شيت كإضافة
//          }

//           else{
//     //  dataTime.sort((a,b)=>new Date(a.date) - new Date(b.date));

//      dataTime[tmp] = daysData; // يعدل الموجود
//      syncToGoogleSheet(daysData, 'update'); // ✅ ضيف السطر ده هنا عشان التعديل يسمع في جوجل
//     mood = 'create';
//     submitBtn.innerHTML = 'Submit';
//     //  rifreshView();
//  }
//       dataTime.sort((a,b)=>new Date(a.date) - new Date(b.date));
//        clearInput();
//      localStorage.setItem('timesDate',JSON.stringify(dataTime));
//      syncToGoogleSheet(daysData);
//          rifreshView();
   
//  let currentData = dataTime;

     
    
//     // showData ()
//     console.log(dataTime , daysData);
//     console.log(daysData);
//     document.querySelector('.welcome').innerHTML='';

//      }
//      else{
//         alert(`Please Chose correct` );
//           document.querySelector(`.welcome`).innerHTML=employName.value;
//     document.querySelector('.welcome').style.color='#fff';
//      }
     

 
    
// })
submitBtn.addEventListener('click', function() {
    let daysData = {
        // id: mood === 'create' ? Date.now() : dataTime[tmp].id, // استخدم Date.now() لضمان ID فريد
        id: mood === 'create' ? (dataTime.length > 0 ? dataTime[dataTime.length - 1].id + 1 : 1) : dataTime[tmp].id,
        date: date.value,
        day: day.value,
        employName: employName.value,
        signIn: signIn.value,
        signOut: signOut.value,
        workHours: workedDay,
        dayHours: diff,
        offer: offerTime,
        employId: employId.value,
        notes: notes.value,
        employType: employType.value,
        vacation: signIn.value !== '' && signOut.value !== '' ? '' : vacation.value,
    }

    if (employName.value !== '' && date.value !== '' && (signIn.value !== '' || vacation.value !== '')) {
        if (mood === 'create') {
            let isDuplicate = dataTime.some(item =>
                item.employName === employName.value &&
                item.date === date.value
            );

            if (isDuplicate) {
                alert('This employee already has a record for this date!');
                return;
            }
            dataTime.push(daysData);
            syncToGoogleSheet(daysData, 'create'); // ✅ نداء واحد هنا للإضافة
        } else {
            dataTime[tmp] = daysData;
            syncToGoogleSheet(daysData, 'update'); // ✅ نداء واحد هنا للتعديل
            mood = 'create';
            submitBtn.innerHTML = 'Submit';
        }

        dataTime.sort((a, b) => new Date(a.date) - new Date(b.date));
        localStorage.setItem('timesDate', JSON.stringify(dataTime));
        
        // syncToGoogleSheet(daysData); ❌ امسح السطر ده نهائياً لأنه المتسبب في الإضافة المزدوجة
        
        clearInput();
        rifreshView();
        document.querySelector('.welcome').innerHTML = '';
    } else {
        alert(`Please Choose correct`);
    }
})
showData();

function clearInput(){
    employName.value='';
    employId.value='';
    date.value='';
    signIn.value='';
    signOut.value='';
    day.value='';
    notes.value='';
    vacation.value='';
    employType.value='';
     dayHours.innerHTML = '';
    workHours.innerHTML = '';
    offer.innerHTML = '';
      signIn.readOnly = false; // ✅ ناقص
    signOut.readOnly = false; // ✅ ناقص

}
 vacation.addEventListener('change',function (){
    if( vacation.value !== ""){
        signIn.readOnly = true;
        signOut.readOnly = true;
        signIn.value='';
    signOut.value='';
    workedDay= 0;
        diff = 0;       // ✅ ناقص
        offerTime = 0;  // ✅ ناقص
        dayHours.innerHTML = '';   // ✅ ناقص
        workHours.innerHTML = '';  // ✅ ناقص
        offer.innerHTML = '';   
    }
    else{
        signIn.readOnly = false;
        signOut.readOnly = false;
      
    }
 })
 
 date.addEventListener('change',function(){
    
         let dayDate = new Date(date.value).toLocaleDateString('en-US',{
        weekday:"long"})
        day.value = dayDate;
    
   
   
 })


 let diff = 0;
let workedDay = 8;
let offerTime = 0;

function calculateHours(){

     let start = new Date (`${date.value}T${signIn.value}`);
      let end = new Date (`${signOut.value}`);
    if(end>start){
     
       diff = (end - start)/ 3600000 ;
       workedDay = diff > 8 ? 8 :diff ;
       offerTime = diff > 8 ? diff - 8 : 0 ;
      
    //   console.log('your worked '+ diff + ' hours = ' + workedDay + ' hours day work and ' + offerTime + ' offer Time');
    //   console.log(diff);
    //   console.log(workedDay);
    //   console.log(offerTime);
    dayHours.innerHTML = `Total ${diff} Hours`;
    workHours.innerHTML = `Day of hours ${workedDay} Hours`;
    offer.innerHTML = `your offerTime ${offerTime} Hours`;
//     alert(`your worked  ${diff}  hours = ${workedDay} hours day work and ${offerTime}  offer Time
// `)

    }
  else{
    alert('Sign Out must be after Sign In!');
     signOut.value = '';
  
    
}
 }
signIn.addEventListener('change', function(){
    vacation.value = ''; // ✅ بتمسح الإجازة
    signIn.readOnly = false;
    signOut.readOnly = false;
    calculateHours();
});

signOut.addEventListener('change', function(){
    vacation.value = ''; // ✅ بتمسح الإجازة
    calculateHours();
});

//  signIn.addEventListener('change',calculateHours);
//  signOut.addEventListener('change',calculateHours);
//  Show Data;
function showData (){
    // اخدنا نسخة من الداتا عشان مش تتمسح وعملنا عليها ترتيب للجدول
        // let sortedData = [...dataTime].sort((a, b) => new Date(a.date) - new Date(b.date));

    let table =``;
    for(let i= 0; i<dataTime.length ; i++){
        table +=`
        <tr>
         <td>${i+1}</td>
         <td>${dataTime[i].date}</td>
         <td>${dataTime[i].day}</td>
         <td>${dataTime[i].signIn}</td>
        <td>${dataTime[i].signOut ? dataTime[i].signOut.split('T')[1] : '-'}</td>     
        <td>${dataTime[i].dayHours}</td>
         <td>${dataTime[i].workHours}</td>
         <td>${dataTime[i].offer}</td>
         <td>${dataTime[i].employId}</td>
         <td>${dataTime[i].employName}</td>
         <td>${dataTime[i].notes}</td>
         <td>${dataTime[i].employType}</td>
         <td>${dataTime[i].vacation}</td>
            <td> <button class="btn btn-outline-warning w-100" onClick=deleteItem(${i}) id="delete">Delete</button></td>
        </tr>
        `
    }
            //   <td><button class="btn btn-outline-danger w-100" onClick=updateData(${i}) id="update">Update</button></td>

    document.getElementById("tableID").innerHTML=table ;
    currentData = dataTime;
     showSummray(currentData);
     showSummrayType(currentData);
}


// function deleteItem(i){
//     let idToDelete = dataTime[i].id;
//     dataTime.splice(i,1)
//     console.log(i);
    
//         localStorage.setItem('timesDate',JSON.stringify(dataTime));
//       deleteFromGoogleSheet(idToDelete);
//       showData();
//         rifreshView();

    
// }


// Update
// function deleteItem(i) {
//     // 1. احفظ الـ ID في متغير "قبل" ما تمسح من المصفوفة
//     let idToDelete = dataTime[i].id; 
    
//     if (confirm("Are you sure you want to delete this record?")) {
//         // 2. امسح من المصفوفة المحلية
//         dataTime.splice(i, 1);
        
//         // 3. حدث التخزين المحلي
//         localStorage.setItem('timesDate', JSON.stringify(dataTime));
        
//         // 4. ابعت أمر المسح لجوجل باستخدام الـ ID اللي حفظناه
//         deleteFromGoogleSheet(idToDelete); 
        
//         // 5. حدث الجدول
//         showData();
//         rifreshView();
//     }
// }
function deleteItem(i){
    let idToDelete = dataTime[i].id;
    dataTime.splice(i, 1);
    localStorage.setItem('timesDate', JSON.stringify(dataTime));
    deleteFromGoogleSheet(idToDelete); // ✅ بتبعت الـ ID للـ Apps Script
    showData();
    rifreshView();
}


function updateData (i){
    employName.value = dataTime[i].employName;
    offer.value = dataTime[i].offer;
    dayHours.value = dataTime[i].dayHours;
    workHours.value = dataTime[i].workHours;
    employType.value = dataTime[i].employType;
    vacation.value = dataTime[i].vacation;
    notes.value = dataTime[i].notes;
    signOut.value = dataTime[i].signOut;
    day.value = dataTime[i].day;
    signIn.value = dataTime[i].signIn;
    date.value = dataTime[i].date;
    employId.value = dataTime[i].employId;

   diff = +dataTime[i].dayHours;
workedDay = +dataTime[i].workHours;
offerTime = +dataTime[i].offer;

    dayHours.innerHTML = `Total ${diff} Hours`;
    workHours.innerHTML = `Day of hours ${workedDay} Hours`;
    offer.innerHTML = `your offerTime ${offerTime} Hours`;

     if(dataTime[i].signIn !== '' && dataTime[i].signOut !== ''){
        // calculateHours();
        signIn.readOnly = false;
        signOut.readOnly = false;
        // vacation.disabled = true;
    }
    else if(dataTime[i].vacation !== ''){
        workedDay = 0;
        diff = 0;
        offerTime = 0;
       
    }

     mood = `update`;
     tmp = i;
    submitBtn.innerHTML =`update`;
      scroll({ top: 0, behavior: 'smooth' }); 
    //    rifreshView();
 }
// function updateData(i) {
//     let item = dataTime[i];

//     // ملء الحقول بالقيم
//     employName.value = item.employName;
//     employType.value = item.employType;
//     employId.value = item.employId;
//     date.value = item.date;
//     day.value = item.day;
//     signIn.value = item.signIn;
//     signOut.value = item.signOut;
//     vacation.value = item.vacation;
//     notes.value = item.notes;

//     // ✅ التعديل الصحيح: اسحب الأرقام من المصفوفة
//     diff = item.dayHours;
//     workedDay = item.workHours;
//     offerTime = item.offer;

//     // تحديث شكل النصوص اللي تحت الفورم
//     dayHours.innerHTML = `Total ${diff} Hours`;
//     workHours.innerHTML = `Day of hours ${workedDay} Hours`;
//     offer.innerHTML = `your offerTime ${offerTime} Hours`;

//     if (item.signIn !== '' && item.signOut !== '') {
//         signIn.readOnly = false;
//         signOut.readOnly = false;
//         // إحنا مش محتاجين ننادي calculateHours هنا لأننا سحبنا القيم خلاص
//     } else if (item.vacation !== '') {
//         signIn.readOnly = true;
//         signOut.readOnly = true;
//     }

//     mood = 'update';
//     tmp = i;
//     submitBtn.innerHTML = 'Update Now';
//     scroll({ top: 0, behavior: 'smooth' });
// }
 
//  search
let searchMood = 'nameSearch'
function getSearchMood(id){

    let serch = document.getElementById('search');
    if(id == 'nameSearch' ){
        searchMood = 'nameSearch';
        document.getElementById('search').placeholder = 'search by name';
console.log(id);
    }
    else{
        searchMood = 'titleSearch';
                document.getElementById('search').placeholder = 'search by Title';

    }
    search.focus();
    serch.value = '';
    showData();
    
};

// let table ='';
 function showName(value){
      activeFilter='name';
      activeValue= value;
      let table = '';
      
      for(i=0; i<dataTime.length ; i++){
        if(dataTime[i].employName.toLowerCase().includes(value.toLowerCase())){
            table +=`
               <tr>
         <td>${i+1}</td>
         <td>${dataTime[i].date}</td>
         <td>${dataTime[i].day}</td>
         <td>${dataTime[i].signIn}</td>
        <td>${dataTime[i].signOut ? dataTime[i].signOut.split('T')[1] : '-'}</td>     
        <td>${dataTime[i].dayHours}</td>
         <td>${dataTime[i].workHours}</td>
         <td>${dataTime[i].offer}</td>
         <td>${dataTime[i].employId}</td>
         <td>${dataTime[i].employName}</td>
         <td>${dataTime[i].notes}</td>
         <td>${dataTime[i].employType}</td>
         <td>${dataTime[i].vacation}</td>
                    <td> <button class="btn btn-outline-warning w-100" onClick=deleteItem(${i}) id="delete">Delete</button></td>
        </tr>
            `
                    //   <td><button class="btn btn-outline-danger w-100" onClick=updateData(${i}) id="update">Update</button></td>

        }
        else{
      
        }}// ناقص في آخر showName
  document.getElementById("tableID").innerHTML = table;};
 function showTitle(value){
    activeFilter='title';
      activeValue= value;
      let table = '';
      
      for(i=0; i<dataTime.length ; i++){
        if(dataTime[i].employType.toLowerCase().includes(value.toLowerCase())){
            table +=`
               <tr>
         <td>${i+1}</td>
         <td>${dataTime[i].date}</td>
         <td>${dataTime[i].day}</td>
         <td>${dataTime[i].signIn}</td>
        <td>${dataTime[i].signOut ? dataTime[i].signOut.split('T')[1] : '-'}</td>     
        <td>${dataTime[i].dayHours}</td>
         <td>${dataTime[i].workHours}</td>
         <td>${dataTime[i].offer}</td>
         <td>${dataTime[i].employId}</td>
         <td>${dataTime[i].employName}</td>
         <td>${dataTime[i].notes}</td>
         <td>${dataTime[i].employType}</td>
         <td>${dataTime[i].vacation}</td>
                    <td> <button class="btn btn-outline-warning w-100" onClick=deleteItem(${i}) id="delete">Delete</button></td>
        </tr>
            `
                    //   <td><button class="btn btn-outline-danger w-100" onClick=updateData(${i}) id="update">Update</button></td>

        }
        else{
      
        } };
        // ناقص في آخر showName
document.getElementById("tableID").innerHTML = table;}
       

document.getElementById('search').addEventListener('keyup', function(e){
    if(e.target.value === ''){
        activeFilter = 'all';
        showData();
    } else if(searchMood === 'nameSearch'){
        showName(e.target.value);
    } else {
        showTitle(e.target.value);
    }
});

function toggleMonthFilter(){
    let panel = document.getElementById('monthPanel');
    if(panel.style.display === 'none'){
        panel.style.display = 'block';
    } else {
        panel.style.display = 'none';
    }
}
//  document.getElementById('monthFilter').addEventListener('change', function(){
//     let selcteMonth = this.value ;
//     let table = '';
//    if (selcteMonth === ''){
//     showData();
//    }

    document.getElementById('monthFilter').addEventListener('change', function(){
    
    
   if (this.value === ''){
    activeFilter = 'all';
   
    showData();
   
   }
   else{
    showMonth(this.value)

   }

  

 });
  function showMonth(value){
    activeFilter = 'month';
    activeValue = value;

    let table ='';
    let filtred= [];

  for(let i=0 ; i<dataTime.length ; i++){
        let month = new Date (dataTime[i].date).getMonth() +1;
      if (month == value){
        filtred.push(dataTime[i]);
        table +=`
               <tr>
         <td>${i+1}</td>
         <td>${dataTime[i].date}</td>
         <td>${dataTime[i].day}</td>
         <td>${dataTime[i].signIn}</td>
        <td>${dataTime[i].signOut ? dataTime[i].signOut.split('T')[1] : '-'}</td>     
        <td>${dataTime[i].dayHours}</td>
         <td>${dataTime[i].workHours}</td>
         <td>${dataTime[i].offer}</td>
         <td>${dataTime[i].employId}</td>
         <td>${dataTime[i].employName}</td>
         <td>${dataTime[i].notes}</td>
         <td>${dataTime[i].employType}</td>
         <td>${dataTime[i].vacation}</td>
         <td> <button class="btn btn-outline-warning w-100" onClick=deleteItem(${i}) id="delete">Delete</button></td>
        </tr>
            `
      }
              //   <td><button class="btn btn-outline-danger w-100" onClick=updateData(${i}) id="update">Update</button></td>

    }
    
    document.getElementById("tableID").innerHTML=table ;
    currentData = filtred; 
    showSummray(currentData);
    showSummrayType(currentData);
   }
                

 let showingVacations = false;
 function toggleVacations(){
    let table= '';
    let selctedMonth = monthFilter.value ;
        if(showingVacations){
        showingVacations = false;
        showData(); // ✅ رجع الكل
        return;
    } 
        showingVacations = true;
        // كود الإجازات بتاعك
   
     for (let i=0 ; i<dataTime.length ; i++){
      let  monthMatch = selctedMonth === '' || new Date(dataTime[i].date).getMonth() +1 == selctedMonth;
        if (dataTime[i].vacation !=='' && monthMatch){
             table +=`
               <tr>
         <td>${i+1}</td>
         <td>${dataTime[i].date}</td>
         <td>${dataTime[i].day}</td>
         <td>${dataTime[i].signIn}</td>
        <td>${dataTime[i].signOut ? dataTime[i].signOut.split('T')[1] : '-'}</td>     
        <td>${dataTime[i].dayHours}</td>
         <td>${dataTime[i].workHours}</td>
         <td>${dataTime[i].offer}</td>
         <td>${dataTime[i].employId}</td>
         <td>${dataTime[i].employName}</td>
         <td>${dataTime[i].notes}</td>
         <td>${dataTime[i].employType}</td>
         <td>${dataTime[i].vacation}</td>
         <td> <button class="btn btn-outline-warning w-100" onClick=deleteItem(${i}) id="delete">Delete</button></td>
        </tr>
            `
        }
     }
                document.getElementById("tableID").innerHTML=table ;
        //   <td><button class="btn btn-outline-danger w-100" onClick=updateData(${i}) id="update">Update</button></td>

 }

//  للتعديل والحذف داخل الفلتر والبحث
let activeFilter = 'all';
let activeValue = '';


function rifreshView(){
    if(activeFilter === 'all') showData();
    else if(activeFilter === 'month') showMonth(activeValue);
    else if(activeFilter === 'name') showName(activeValue);
    else if(activeFilter === 'type') showTitle(activeValue);
    else if(activeFilter === 'vacation') toggleVacations();
}

function toggleShowTotal(){
    // document.getElementById('totalEmployee').classList.toggle(d-flex);
   let totalEmployee = document.getElementById('totalEmployee');
totalEmployee.classList.toggle('d-none');
}
function showSummray(data){
let summray = {};

data.forEach(item=>{
    if(!summray[item.employName]){
        summray[item.employName]={
            name: item.employName,
            id: item.employId,
            type: item.employType,
            days: 0,
            totalHours: 0,
             normalHours: 0,
             overTime: 0,
             vacations: 0


        }
    }
    summray[item.employName].days += 1;
    summray[item.employName].totalHours += +item.dayHours;
    summray[item.employName].normalHours  += +item.workHours;
    summray[item.employName].overTime  += +item.offer;
    if(item.vacation !=='') summray[item.employName].vacations += 1;
})
let table ='';
for (let name in summray){
    table +=`
  <tr>
    <td>${summray[name].id}</td>
    <td>${summray[name].name}</td>
    <td>${summray[name].type}</td>
    <td>${summray[name].normalHours}</td>
    <td>${summray[name].overTime}</td>
    </tr>
    `
}
document.getElementById('summrayID').innerHTML=table;
}

function showSummrayType(data){
    let qcHours = 0;
    let qcOffer = 0;
    let analHours = 0;
    let analOffer = 0;

    data.forEach(item =>{
        if(item.employType === 'GIS_QC'){
            qcHours += +item.dayHours;
        }
        else{
            analHours += +item.dayHours;
        }
    })
    document.getElementById('summrayType').innerHTML = `
    <tr>
    <td>${qcHours}</td>
    <td>${analHours}</td>
    </tr>
    `
  

}

// Export To Excel
function exportToExcel(){
    
    // ✅ بتشوف الفلتر الحالي وتاخد الداتا المناسبة
    let exportData;
    
    if(activeFilter === 'all'){
        exportData = dataTime;
    } else if(activeFilter === 'month'){
        exportData = dataTime.filter(item => 
            new Date(item.date).getMonth() + 1 == activeValue
        );
    } else if(activeFilter === 'name'){
        exportData = dataTime.filter(item => 
            item.employName.toLowerCase().includes(activeValue.toLowerCase())
        );
    } else if(activeFilter === 'title'){
        exportData = dataTime.filter(item => 
            item.employType.toLowerCase().includes(activeValue.toLowerCase())
        );
    }
    let exportFormatted = exportData.map((item , index)=> ({
        'Object Id': index + 1,
        'Date': item.date,
        'Days': item.day,
        
        'Start Time': item.signIn,
        'End Time': item.signOut ? item.signOut.split('T')[1] : '-',
        'hours Worked': item.dayHours,
        'Normal Hours': item.workHours,
        'Extra Hours': item.offer,
        'Employee Code': item.employId,
        'Employee Name': item.employName,
        'Justification': item.notes,
        'Employee Type': item.employType,
        'Vacation': item.vacation,
    }));

// console.log(exportFormatted);

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.aoa_to_sheet([[]]);

//    XLSX.utils.sheet_add_json(ws, exportFormatted, {origin: 'A15'});


    let summaryData = getSummaryArray(exportData); //  بتبعت exportData
    XLSX.utils.sheet_add_json(ws, summaryData, {origin: 'A1'});

    let typeData = getTypeArray(exportData); //  بتبعت exportData
    XLSX.utils.sheet_add_json(ws, typeData, {origin: 'H1'});

    XLSX.utils.sheet_add_json(ws, exportFormatted, {origin: 'A15'}); // ✅
console.log(ws);
    XLSX.utils.book_append_sheet(wb, ws, "TimeSheet");
    XLSX.writeFile(wb, "TimeSheet.xlsx");
}
function getSummaryArray(data){
    let summary = {};
    data.forEach(item => {
        if(!summary[item.employName]){
            summary[item.employName] = {
                
                'Employee Code': item.employId,
                'Employee Name': item.employName,
                'Type': item.employType,
                'Normal Hours': 0,
                'Over Time': 0
            }
        }
        summary[item.employName]['Normal Hours'] += +item.workHours;
        summary[item.employName]['Over Time'] += +item.offer;
        
    });
    return Object.values(summary);
}

function getTypeArray(data){
    let qcHours = 0;
    let analHours = 0;
    data.forEach(item => {
        if(item.employType === 'GIS_QC') qcHours += +item.dayHours;
        else analHours += +item.dayHours;
    });
    return [{'GIS_QC': qcHours, 'GIS_ANALYSIS': analHours}];
    console.log(exportFormatted);
}

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbw6BmLXLmsjMEJnAcP27mOP3e49eciUiC83FTG63q3QDDIkAuh_iMIolgwOj7faQW1c/exec';

function syncToGoogleSheet(data, action) {
  fetch(SHEET_URL, {
    method: 'POST',
    body: JSON.stringify({ action: action, ...data })
  }).then(() => {
    syncSummaryToSheet(); // ✅ بعد كل create/update ابعت الـ summary
  });
}

function syncSummaryToSheet() {
  let summaryData = getSummaryArray(dataTime);
  let typeData = getTypeArray(dataTime)[0];

  fetch(SHEET_URL, {
    method: 'POST',
    body: JSON.stringify({
      action: 'updateSummary',
      summary: summaryData,
      typeData: typeData
    })
  });
}
// وظيفة حذف السطر من جوجل شيت
function deleteFromGoogleSheet(id) {
    fetch(SHEET_URL, {
        method: 'POST',
        // بنبعت الأكشن "delete" والـ ID اللي عايزين نمسحه
        body: JSON.stringify({ 
            action: 'delete', 
            id: id 
        })
    })
    .then(response => response.text())
    .then(data => {
        console.log("Response from Script:", data);
        // بعد ما يتم الحذف بنجاح، بنحدث الملخص (Summary) عشان الأرقام تظبط
        syncSummaryToSheet(); 
    })
    .catch(error => {
        console.error('Error while deleting:', error);
        alert('حدث خطأ أثناء الحذف من جوجل شيت');
    });
}


document.querySelector('.main-btn').addEventListener('click', function(){
    document.querySelector('.float-items').classList.toggle('show');
});