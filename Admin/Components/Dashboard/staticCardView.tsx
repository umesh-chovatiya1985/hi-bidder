import React from 'react'

export default function StaticCardView({counter}: any) {
  return (
    <div className="card mt-6">
        <div className="card-body flex items-center">                            
            <div className={`px-3 py-2 rounded bg-${counter.color}-600 text-white mr-3`}>
                <i className={`fa ${counter.fa_icon}`}></i>
            </div>
            <div className="flex flex-col">
                <h1 className="font-semibold"><span className="num-2">{counter.header_count}</span> {counter.header_title}</h1>
                <p className="text-xs"><span className="num-2">{counter.sub_header_count}</span> {counter.sub_header_title}</p>
            </div>
        </div>
    </div>
  )
}
