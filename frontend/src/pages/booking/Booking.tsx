import { useOutletContext } from 'react-router-dom'
import './booking.css'
import { useEffect, useState } from 'react';
import MapSeat from '../../components/mapseat/MapSeat';
import FormBook from '../../components/formbook/FormBook';

export default function Booking(){
    const {setCurPage}:any = useOutletContext();
    const [payMode, setPayMode] = useState(false);

    useEffect(() => {
        setCurPage("booking")
    }, [])

    return(
        <main className='booking'>
            <div className='inner'>
                <div className='sub-inner'>
                    <MapSeat payMode={payMode}/>
                    <FormBook setPayMode={setPayMode}/>
                </div>
            </div>
        </main>
    )
}