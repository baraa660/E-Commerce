import React from 'react'

function Input({type="text", name , id , title , value , onchange , errors , onblur , touched , className}) {

    
  return (
    <>
      <div className=' input-group '>
        
        <input className={`ms-3 form-control ${className}`} placeholder={title} type={type} name={name} id={id} value={value} onBlur={onblur} onChange={onchange}/>
        
      </div>
      
      <div className='ms-4 text-align: start'>{touched[name]&&errors[name]&&<p className='text text-danger'>{errors[name]}</p>}</div>
    </>
  )
  
}

export default Input
