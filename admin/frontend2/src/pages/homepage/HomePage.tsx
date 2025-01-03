import { BrowserMultiFormatReader, IScannerControls } from "@zxing/browser";
import { useCallback, useEffect, useRef, useState } from "react";
import "./homepage.css";
import { checkin, getTickets } from "../../services/StatusService";
import { message, Spin } from "antd";

function useDebounce(func: Function, delay: number) {
    const timeoutRef = useRef<any>(null);

    return useCallback(
        (...args: any[]) => {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => func(...args), delay);
        },
        [delay]
    );
}

export default function HomePage() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [tickets, setTickets] = useState<any[]>([]);
    const [ticket, setTicket] = useState<any | null>(null);
    const [isScanning, setIsScanning] = useState(true);
    const activeStream = useRef<IScannerControls | null>(null);

    // Fetch tickets on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getTickets();
                setTickets(res);
            } catch (error) {
                console.error("Error fetching tickets:", error);
            }
        };
        fetchData();
    }, []);

    // Start QR code scanning and handle result
    const startDecoding = useDebounce(() => {
        if (videoRef.current && isScanning) {
            const codeReader = new BrowserMultiFormatReader();
            navigator.mediaDevices
                .getUserMedia({ video: { facingMode: "environment" } }) // Use rear camera
                .then(() => {
                    codeReader
                        .decodeFromVideoDevice(undefined, videoRef.current!, (result_, err) => {
                            if (result_) {
                                setResult(result_.getText());
                            }
                        })
                        .then((stream) => {
                            activeStream.current = stream;
                        })
                        .catch((err) => console.error("Error starting camera:", err));
                })
                .catch((err) => {
                    console.error("Camera access denied or not available:", err);
                    message.error("Không thể truy cập camera. Vui lòng kiểm tra quyền!");
                });
        }
    }, 1000);

    // Initiate QR decoding if scanning is enabled
    useEffect(() => {
        if (isScanning) {
            startDecoding();
        } else {
            if (activeStream.current) {
                activeStream.current.stop();
                activeStream.current = null;
            }
        }
    }, [isScanning, startDecoding]);

    // Handle the ticket search based on QR result
    useEffect(() => {
        if (result) {
            const foundTicket = tickets.find((ticket) => ticket.isActive === result);
            if (foundTicket) {
                message.success("Quét thành công!");
                setTicket(foundTicket);
                setIsScanning(false);
            } else {
                message.error("Không tìm thấy vé!");
            }
        }
    }, [result, tickets]);

    // Handle check-in and reset state
    async function handleCheckin() {
        if (!ticket) return;
        try {
            await checkin(ticket._id);
            message.success("Check-in thành công!");
            handleBack();
        } catch (error) {
            console.error("Error during check-in:", error);
            message.error("Check-in thất bại. Vui lòng thử lại!");
        }
    }

    function handleBack() {
        setTicket(null);
        setResult(null);
        setIsScanning(true);
    }

    if (tickets.length === 0) {
        return (
            <div className="homepage">
                <Spin />
            </div>
        );
    }

    return (
        <div className="homepage">
            {isScanning ? (
                <>
                    <h1>Quét Mã QR Check-in</h1>
                    <div className="video">
                        <video ref={videoRef} autoPlay muted />
                    </div>
                </>
            ) : (
                <div className="infor">
                    <p>Họ và tên: <span>{ticket?.name}</span></p>
                    <p>Số điện thoại: <span>{ticket?.phone}</span></p>
                    <p>Vị trí: <span>{ticket?.seat}</span></p>
                    {ticket?.status === "DONE" ? (
                        <div>
                            <p className="checkin" onClick={handleCheckin}>Check-in!</p>
                            <p className="back" onClick={handleBack}>Thoát!</p>
                        </div>
                    ) : (
                        <div>
                            <p className="bug">Vé này đã check-in!</p>
                            <p className="back" onClick={handleBack}>Thoát!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
