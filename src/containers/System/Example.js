import { constant, now } from "lodash";
import { useEffect, useRef, useState } from "react";

function formatDate(date) {
  const hour = `0${date.getHours()}`.slice(-2)
  const min = `0${date.getMinutes()}`.slice(-2)
  const sec = `0${date.getSeconds()}`.slice(-2)
  return `${ hour }: ${ min } : ${ sec }`
  
}
function Example(data) {
  
  const [timer, setTimer] = useState('00:00:00');
  const deadline = data.data*60*1000
  useEffect(()=>{
    const timeInterval = setInterval(() => {
     
      const now = new Date()

 
      const newTiemString = formatDate(now)
      setTimer(newTiemString)

    }, 1000);


   
  }, [])

  return (
    
    <div>
      <p style={{ fontSize: '15px' }}>{timer}</p>
      
    </div>
  );
}
export { Example };