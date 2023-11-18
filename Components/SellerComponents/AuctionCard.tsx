import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { getAPIUrl } from '../../lib/useLocalStorage';
import Link from 'next/link';
import dateFormat from 'dateformat';
import moment from 'moment';

export default function AuctionCard({ auction, processEvent, actionEvent, isClicked }){ 
    const [action, setAction] = useState(false);
    const [status, setStatus] = useState(false);
    const [isSchedule, setIsSchedule] = useState(false);
    const [scheduleDateTime, setScheduleDateTime] = useState(null);
    const mainUrl = getAPIUrl() || process.env.API_URL;
    const actionClick = () => {
        setAction(!action);
        actionEvent(!action);
        setStatus(false);
    }

    const statusClick = () => {
        setStatus(!status);
        setAction(false);
        actionEvent(!status);
    }

    const takeStatusAction = async (status: any) => {
        processEvent(true);
        setStatus(false);
        const statusRequest = await fetch(mainUrl+"auction/status/"+auction._id, {
            method: "PUT",
            body: JSON.stringify({"status": status}),
            headers: { "Content-Type": "application/json" }
        });
        const statusRespo = await statusRequest.json();
        if(statusRequest.ok){
            if(statusRespo.status == 1){
                toast.success(statusRespo.message, {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    theme: "dark",
                });
                auction.status = status;
            }
        }
        processEvent(false);
    }

    const handleDateChange = (e: any) => {
        setScheduleDateTime(e.target.value);
    }

    const setScheduleAction = async () => {
        if(!scheduleDateTime){
            toast.error("Opps! required schedule Date & Time. Please, select it", {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                theme: "dark",
            });
            return;
        }
        processEvent(true);
        setStatus(false);
        const statusRequest = await fetch(mainUrl+"auction/schedule/"+auction._id, {
            method: "PUT",
            body: JSON.stringify({"scheduleTime": scheduleDateTime, "status": "Scheduled"}),
            headers: { "Content-Type": "application/json" }
        });
        const statusRespo = await statusRequest.json();
        if(statusRequest.ok){
            if(statusRespo.status == 1){
                toast.success(statusRespo.message, {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    theme: "dark",
                });
                auction.status = status;
            }
        }
        setStatus(false);
        processEvent(false);
    }

    const takeActionAction = async (status: any) => {
        // toast.success(status, {
        //     position: "top-right",
        //     autoClose: 5000,
        //     closeOnClick: true,
        //     theme: "dark",
        // });
        if(status == 'Delete'){
            deleteRecord();
        }
    }
    const deleteRecord = async () => {
        processEvent(true);
        setAction(false);
        const deleteRequest = await fetch(mainUrl+"auction/"+auction._id, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        const deleteRespo = await deleteRequest.json();
        if(deleteRequest.ok){
            if(deleteRespo.status == 1){
                toast.success(deleteRespo.message, {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                    theme: "dark",
                });
            }
        }
        processEvent(false);
    }
    const setAuctionSchedule = () => {
        setIsSchedule(true);
        setStatus(false);
    }
    useEffect(() => {
        if(!isClicked){
            setAction(false);
            setStatus(false);
        }
    }, [isClicked])


    const [waitCounter, setWaitCounter] = useState(null);
    const formatTime = (duration: any) => {
        let days: any = Math.floor(duration / 86400);
        let hours: any = Math.floor((duration % 86400) / 3600);
        let minutes: any = Math.floor((duration % 3600) / 60);
        let seconds: any = duration % 60;
        let response = "";
        if (days < 10) {
            days = '0' + days;
        }
        // if (parseInt(days) > 0) {
        response = days + ' Days ';
        // }
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return '<span>'+response+'</span><span>'+ hours +'</span>:<span>'+ minutes +'</span>:<span>'+ seconds +'</span>';
    };
    useEffect(() => {
        const timer = setInterval(() => {
            setWaitCounter((waitCounter: any) => moment(auction.scheduleTime).diff(moment(), 'seconds'));
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

   return (
    <>
        <div className="max-w-full flex border-1 rounded shadow">
            <div className="h-48 h-auto w-48 flex-none bg-contain bg-no-repeat bg-center rounded text-center overflow-hidden" style={{ backgroundImage: "url('"+auction.default_image+"')"}} title="Woman holding a mug">
            </div>
            <div className="bg-gray-100 rounded-b p-4 flex flex-col justify-between leading-normal relative">
                <div className="mb-2">
                    <div className="text-gray-900 font-semibold text-xl mb-2">{auction.title}</div>
                    <p className="text-gray-600 text-sm">{auction.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-1 text-sm">
                    <div className='col-span-2'>
                        <div className="grid grid-cols-1 gap-1">
                            <div><strong>Categories : </strong></div>
                            <div>
                                <ul>
                                {auction.categories_ids.map((category: any, index: any) => (
                                    <li key={index} className='inline mr-2 text-[#909090]'>
                                        <Link href={'/category/' + category.slug}>
                                            <a target='_blank' className='text-[#909090]'>
                                                {category.title}
                                            </a>
                                        </Link>
                                         <i className="ml-2 fa fa-arrow-right"></i>
                                    </li>
                                ))}
                                    <li className='inline'>
                                        <Link href={'/category/' + auction.category_id.slug}>
                                            <a target='_blank'>
                                                {auction.category_id.title}
                                            </a>
                                        </Link>
                                    </li>
                                </ul>   
                            </div>
                        </div>     
                    </div>
                    <div>
                        <div className="grid grid-cols-3 gap-1">
                            <div><strong>Condition</strong></div>
                            <div className="col-span-2">: {auction.condition}</div>
                        </div>     
                    </div>
                    <div>
                        <div className="grid grid-cols-3 gap-1">
                            <div><strong>SKU</strong></div>
                            <div className="col-span-2">: {auction.sku}</div>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-3 gap-1">
                            <div><strong>Brand</strong></div>
                            <div className="col-span-2">: {auction.brand}</div>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-3 gap-1">
                            <div>
                                <strong>Modal No</strong>
                            </div>
                            <div className="col-span-2"> : {auction.model_no}</div>
                        </div>
                    </div>
                    <div className="col-span-2"> Auction Status</div>
                    <div>
                        <div className="grid grid-cols-3 gap-1">
                            <div className='pt-2'>
                                <strong>Status</strong>
                            </div>
                            <div className='col-span-2'>
                                <div className="relative inline-block text-left">
                                    <button onClick={statusClick} type="button" className="z-20 inline-flex border-1 relative justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                        {auction.status.charAt(0).toUpperCase() + auction.status.slice(1)}
                                        <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    { status && 
                                        <div className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu">
                                            <div className="py-1" role="none">
                                                {auction.status!='Draft' && <div onClick={() => takeStatusAction('Draft')} className="text-yellow-700 block px-4 py-2 text-sm cursor-pointer" role="menuitem">
                                                    Draft
                                                </div>}
                                                {auction.status!='Publish' && <div onClick={() => takeStatusAction('Publish')} className="text-green-700 block px-4 py-2 text-sm cursor-pointer" role="menuitem">
                                                    Publish
                                                </div>}
                                                {auction.status!='Scheduled' && <div onClick={setAuctionSchedule} className="text-red-700 block px-4 py-2 text-sm cursor-pointer" role="menuitem">
                                                    Scheduled
                                                </div>}
                                                {auction.status!='Unpublish' && <div onClick={() => takeStatusAction('Unpublish')} className="text-rose-700 block px-4 py-2 text-sm cursor-pointer" role="menuitem">
                                                    Unpublish
                                                </div>}
                                                {auction.status!='Block' && <div onClick={() => takeStatusAction('Block')} className="text-red-700 block px-4 py-2 text-sm cursor-pointer" role="menuitem">
                                                    Block Permemant
                                                </div>}
                                            </div>
                                        </div>
                                    }
                                </div>    
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-3 gap-1">
                            <div className='pt-2'>
                                    <strong>Actions</strong>
                            </div> 
                            <div className='col-span-2'>
                                <div className="relative inline-block text-left">
                                    <button onClick={actionClick} type="button" className="z-20 inline-flex border-1 relative justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                        Actions
                                        <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    {   action && 
                                        <div className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu">
                                            <div className="py-1" role="none">
                                                <div onClick={() => takeActionAction('Delete')} className="block px-4 py-2 text-sm text-rose-900 cursor-pointer" role="menuitem">
                                                    <i className="fa fa-trash"></i> Delete
                                                </div>
                                                <div onClick={() => takeActionAction('Edit')} className="text-indigo-700 block px-4 py-2 text-sm cursor-pointer" role="menuitem">
                                                    <i className="fa fa-edit"></i> Edit
                                                </div>
                                                <Link key={1} onClickCapture={() => setStatus(false)} href={"/details/" + auction.slug} target="_blank">
                                                    <a target='_blank' className="text-black block px-4 py-2 text-sm cursor-pointer" role="menuitem">
                                                        <i className="fa fa-eye"></i> Live View
                                                    </a>
                                                </Link>
                                                <Link key={2} href={"/account/seller/auction/finished-auction/auction-detail/" + auction.slug}>
                                                    <a className="text-black block px-4 py-2 text-sm cursor-pointer" role="menuitem">
                                                        <i className="fa fa-eye"></i> View Auction details
                                                    </a>
                                                </Link>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>                    
                </div>
                {isSchedule &&
                    <div className='bg-[#F2F2F2] border-t-2 border-[#e0e0e0] mt-3 px-2 absolute bottom-0 left-0 right-0 z-[9999999]'>
                        <h5 className='mt-2'>Schedule publish Date & Time</h5>
                        <input className='z-20 inline-flex border-1 relative justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50' type="datetime-local" onChange={handleDateChange} />
                        {/* <input className='z-20 inline-flex border-1 relative justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50' type="time" onChange={handleDateChange} /> */}
                        <button onClick={setScheduleAction} className='btn btn-primary px-3 m-2'>Save</button>
                        <button onClick={() => setIsSchedule(false)} className='btn btn-danger px-3'>Close</button>
                    </div>
                }
                {!isSchedule && auction.status=='Scheduled' &&
                    <>
                        <div className="grid grid-cols-2 pt-2 gap-1">
                            <div>
                                <strong>Schedule Date Time</strong>
                            </div> 
                            <div>
                                {dateFormat(auction.scheduleTime, "dd-mm-yyyy hh:MM TT")}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 pt-2 gap-1">
                            <div>
                                Activate after
                            </div>
                            <div>
                                <i className="fa fa-clock-o text-[18px] px-1"></i> <span dangerouslySetInnerHTML={{__html: formatTime(waitCounter)}}></span>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    </>
   );
};