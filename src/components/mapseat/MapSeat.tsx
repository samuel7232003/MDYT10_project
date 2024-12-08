import { ReactNode, useEffect, useState } from 'react';
import './mapseat.css'

export default function MapSeat(){
    const [numRow, setNumRoll] = useState([""]);
    const [indexHover, setIndexHover] = useState<number|null>(20);
    const [sideHover, setSideHover] = useState<boolean|null>(null);
    const numColLeft = 14;
    const numColRight = 16;

    useEffect(() => {
        arrayFromAtoT();
    },[])

    function arrayFromAtoT() {
        let alphabet = [];
        for (let i = 65; i <= 84; i++) { // 65 là mã ASCII của 'A', 84 là mã ASCII của 'T'
            alphabet.push(String.fromCharCode(i));
        }
        for(let i = 0; i<3; i++) alphabet.unshift("");
        setNumRoll(alphabet);
    }

    function handleBlur(side: boolean, index: number){
        setIndexHover(index);
        setSideHover(side);
    }

    function createList (num:number):ReactNode{
        let side = num===14? true: false;
        return(
            <ul>
                {Array.from({ length: num }, (_, index) => (
                    <li 
                        style={(side === sideHover && index === indexHover) ? {backgroundColor:"#198c07"} : undefined} 
                        className='seat' 
                        key={index} 
                        onMouseMove={() => handleBlur(side, index)}>
                    </li>
                ))}
            </ul>
        )
    }

    function createListNum (num:number):ReactNode{
        let push = 0;
        if(num === 16) push = 14
        return(
            <ul>
                {Array.from({ length: num }, (_, index) => (
                    <li className='seatnum' key={index}>{index+push+1}</li>
                ))}
            </ul>
        )
    }

    return(
        <div className="mapseat">
            <p className="title">Sơ đồ ghế ngồi đêm nhạc “Mùa Đông Yêu Thương 10”</p>
            <div className="main">
                <div className="stage">
                    <p>STAGE</p>
                </div>
                <ul className='list-row'>
                    {numRow.map((value, index) => 
                        <li className='row' key={index} >
                            <p className='textrow'>{value}</p>
                            {value === "" ? 
                                <div className='rowseat'> <div className='left'></div> <div className='right'></div> </div>
                            :<div className='rowseat'>
                                {createList(numColLeft)}
                                {createList(numColRight)}
                            </div>} 
                        </li>
                    )}
                    <li className='row num' key={-1}><p className='textrow'></p><div className='rowseat'>
                        {createListNum(numColLeft)}
                        {createListNum(numColRight)}
                    </div></li>
                </ul>
            </div>
        </div>
    )
}