import React from 'react'

export default function ReportCard(props: any) {
  return (
    <div className="report-card">
        <div className="card">
            <div className="card-body flex flex-col">
                <div className="flex flex-row justify-between items-center">
                    <div className={`h6  ${props.report.icon_color} fad ${props.report.fa_icon}`}></div>
                    <span className={`rounded-full text-white badge text-xs ${props.report.badge_color}`}>
                        {props.report.work_percent}
                        <i className="fa fa-chevron-up ml-1"></i>
                    </span>
                </div>
                <div className="mt-8">
                    <h1 className={`h5 num-4 ${props.report.icon_color}`}>{props.report.work_state}</h1>
                    <p>{props.report.work_title}</p>
                </div>          
            </div>
        </div>
    </div>
  )
}
