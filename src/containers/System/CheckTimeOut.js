import { useEffect, useRef, useState } from "react";

function formatDate(date) {
  const hour = `0${date.getHours()}`.slice(-2)
  const min = `0${date.getMinutes()}`.slice(-2)
  const sec = `0${date.getSeconds()}`.slice(-2)
  return `${ hour }: ${ min } : ${ sec }`
  
}
function CheckTimeOut(data) {
  
  const [test, setTimer] = useState('00:00:00');

  
  useEffect(()=>{
    const timeInterval = setInterval(() => {
     
      const now = new Date()

 
      const newTiemString = formatDate(now)
      setTimer(newTiemString)

    }, 1000);

  
    console.log(test)
  },)

  return (
 
    < div >
      
       <p style = {{fontSize : '15px'}}>{test}</p>
    </div>
  );
}
export { CheckTimeOut };