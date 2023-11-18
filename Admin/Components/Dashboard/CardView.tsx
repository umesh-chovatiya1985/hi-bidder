import React from 'react'

export default function CardView({staticitems}: any) {
  return (
    <div className="card">
        <div className="py-3 px-4 flex flex-row justify-between">
            <h1 className="h6">
                <span className="num-4">{staticitems.count_number}</span>k
                <p>{staticitems.count_title}</p>
            </h1>
            <div className={`bg-${staticitems.icon_color}-200 text-${staticitems.icon_color}-700 border-${staticitems.icon_color}-300 border w-10 h-10 rounded-full flex justify-center items-center`}>
                <i className={`fa ${staticitems.count_icon}`}></i>
            </div>
        </div>     
    </div>
  )
}
