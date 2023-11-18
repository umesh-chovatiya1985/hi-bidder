import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function FormControl({ register, errors, type, formName, formLabel, validation, isPassword, handleOnKeyUp } : any) {
  const [faIcon, setFaIcon] = useState('fa-eye-slash');
  const [controlType, setControlType] = useState(type);

  const showPassword = () => {
    const newType = controlType == 'password' ? 'text' : 'password';
    const newIcon = controlType == 'password' ? 'fa-eye' : 'fa-eye-slash';
    setFaIcon(newIcon);
    setControlType(newType);
  }

  const handleKeyUp = (e: any) => {
    if(handleOnKeyUp){
        handleOnKeyUp(e);
    }
  }

  return (
    <>
        <label htmlFor={formName} className={`${errors[formName] ? 'text-[#990000]' : ''} font-semibold`}>{formLabel}</label>
        <div className='relative'>
            <input onKeyUp={handleKeyUp} {...register(formName, validation)} id={formName} type={controlType} autoComplete={formName} className={`${errors[formName] ? 'border-[#990000] shadow-[#9900005c]' : 'border-gray-300'} shadow-md relative block w-full appearance-none rounded px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-primary-color focus:outline-none focus:ring-primary-color sm:text-sm`} placeholder={formLabel} />
            {!errors[formName] && isPassword && <i className={`z-10 fa ${faIcon} absolute top-1 cursor-pointer right-2 text-2xl`} onClick={showPassword}></i>}
            <span className='absolute top-1 right-2 text-2xl' id={`${formName}-error-title`}>
                {errors[formName] && <p className='text-[#990000]' role="alert"><i className="fa fa-info-circle"></i></p>}
            </span>
        </div>
        {errors[formName] && <ReactTooltip
            anchorId={`${formName}-error-title`}
            place="right"
            variant="error"
            content={errors[formName]?.message}
        />}
    </>
  )
}
