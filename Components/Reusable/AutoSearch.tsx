import { useEffect, useState } from "react";

function getOptionClass(index: any, length: any, selCursor: any) {
    let classNames = "hover:bg-[#999999] hover:text-white cursor-pointer border-1 px-3 py-2";
    if(index == 0) classNames += " rounded-t-lg";
    else if(index == length - 1) classNames += " rounded-b-lg";
    if(index == selCursor) classNames += " bg-[#999999] text-white";
    return classNames;
}

export default function AutoSearch() {
   
   const [showOption, setShowOption] = useState(false);
   const [selCursor, setSelCursor] = useState(-1);
   const [search, setSearch] = useState("");
   const dataOption = [
        "Testing record 1",
        "Testing record 2",
        "Testing record 3",
        "Testing record 4",
        "Testing record 5"
    ];
   const [filterData, setFilterData] = useState([]);
   
   const filterItems = (e: any) => {
        const searchValue = e.target.value;
        setSearch(searchValue);
        filterItem(searchValue);
   }
   const filterItem = (curcat: any) => {
    if(curcat.trim().length > 0){
        const newItem = dataOption.filter((item) => {
            return item.toLowerCase().indexOf(curcat.trim().toLowerCase()) !== -1;
        });
        setFilterData(newItem);
        return;
    }
    setFilterData([]);
  };
   const keyUpEvent = (e: any) => {
        // console.log(e);
        if(e.code == "ArrowDown" && selCursor < (dataOption.length - 1)){
            setSelCursor(selCursor => selCursor + 1);
            setSearch(dataOption[selCursor + 1]);
        }
        else if(e.code == "ArrowUp" && selCursor >= 0){
            setSelCursor(selCursor => selCursor - 1);
            if(selCursor - 1 >= 0){
                setSearch(dataOption[selCursor - 1]);
                return;
            }
            setSearch("");
            setShowOption(false);
        }
        else if(e.code == "Escape"){
            setSearch("");
            setShowOption(false);
        }
   }

   useEffect(() => {
        const openOption = filterData.length > 0 ? true : false;
        setShowOption(openOption);
   }, [filterData])
   return (
       <>
            {showOption && <div onClick={() => setShowOption(false)} className="search-wrapper z-10 fixed bg-[#00000052] top-0 bottom-0 left-0 right-0"></div>}
            <div className="search relative h-full z-30">
                <form action="/search" autoComplete="off">
                    <div className="input-group">
                        <input name='q' type="text" id='search' className="form-control" placeholder="Search for items"
                            onKeyUp={keyUpEvent}
                            value={search}
                            onChange={filterItems}
                        />
                        <button type="submit" className="input-group-append">
                            <span className="input-group-text bg-transparent text-primary">
                                <i className="fa fa-search"></i>
                            </span>
                        </button>
                    </div>
                </form>
                {showOption && <div className='absolute z-30 top-[99%] rounded w-full bg-[#efefef]'>
                    <ul className='rounded'>
                        {filterData.map((Option, i) =>
                            <li key={Option} onClick={() => setSearch(Option)} className={getOptionClass(i, filterData.length, selCursor)}>{Option}</li>
                        )}
                    </ul>
                </div>}
            </div>
       </>
   );
};