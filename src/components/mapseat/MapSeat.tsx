import { ReactNode, useEffect, useState } from 'react';
import './mapseat.css'

export default function MapSeat(){
    const [numRow, setNumRoll] = useState([""]);
    const [indexHover, setIndexHover] = useState<number|null>(20);
    const [sideHover, setSideHover] = useState<boolean|null>(null);
    const [selectSeat, setSelectSeat] = useState<string[]>([]);
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

    function handleChoice(side: boolean, index: number, row: string){
        let col = side ? index+1 : index+15;
        let seat = "";
        if(col<10) seat = row+"0"+col;
        else seat = row+col
        const check = selectSeat.find(index => index === seat);
        if(!check){
            setSelectSeat([...selectSeat, seat]);
            console.log(seat);
        }
        else {
            const list = selectSeat.filter(index => index !== seat);
            setSelectSeat([...list]);
        }
    }

    function findColor(side: boolean, index: number, row: string){
        let col = side ? index+1 : index+15;
        let seat = "";
        if(col<10) seat = row+"0"+col;
        else seat = row+col;
        if(selectSeat.find(index => index === seat)) return {backgroundColor:"#26BEC8"};
        if(side === sideHover && index === indexHover) return {backgroundColor:"#198c07"};
        else return undefined;
    }

    function createList (num:number, row: string):ReactNode{
        let side = num===14? true: false;
        return(
            <ul>
                {Array.from({ length: num }, (_, index) => (
                    <li 
                        style={findColor(side, index, row)} 
                        className='seat' 
                        key={index} 
                        onMouseMove={() => handleBlur(side, index)}
                        onClick={() => handleChoice(side, index, row)}>
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

    function handleRemove(seat: string){
        const list = selectSeat.filter(index => index !== seat);
        setSelectSeat([...list]);
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
                                {createList(numColLeft, value)}
                                {createList(numColRight, value)}
                            </div>} 
                        </li>
                    )}
                    <li className='row num' key={-1}><p className='textrow'></p><div className='rowseat'>
                        {createListNum(numColLeft)}
                        {createListNum(numColRight)}
                    </div></li>
                </ul>
            </div>
            <div className='note'>
                <div className='item i1'><div></div><p>Vị trí đã đặt</p></div>
                <div className='item i2'><div></div><p>Vị trí có thể chọn</p></div>
                <div className='item i3'><div></div><p>Vị trí bạn đang chọn</p></div>
            </div>
            <div className='listchoice'>
                <p>Những vị trí đang chọn:</p>
                <div>
                    <ul>
                        {selectSeat.map(index => <li key={index} onClick={() => handleRemove(index)}>{index}</li>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}