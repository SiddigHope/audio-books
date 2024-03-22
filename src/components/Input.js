import React from 'react'
import './styles.css'

function Input({ label, placeholder, style, onChangeHandler, type, required, name, className, value, options=[], accept }) {
    return (
        <div className='input-container'>
            {label && (<span className='text-base mb-1 mt-5 text-gray-800'>:{label}</span>)}
            {type === "select" ? (
                <select className='select-input text-base bg-gray-500 p-5' required name={name}>
                    {options.map(option => (
                        <option value={option.value}>{option.name}</option>
                    ))}
                </select>
            ) : type ==="submit"?(
                <input type={type}
                    style={style && style}
                    name={name}
                    value={value}
                    className={"input text-base bg-gray-500 p-10" + className}
                />
            ) :
            (
                <input type={type}
                    style={style && style}
                    name={name}
                    accept={accept&&accept}
                    value={value}
                    onChange = {onChangeHandler}
                    className={"input text-base bg-gray-500 p-10" + className}
                    placeholder={placeholder}
                    required
                />
            )}
        </div>
    )
}

export default Input