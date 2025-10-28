import Lottie from "lottie-react";
import animationData from "@/public/Sending/Loading 40 _ Paperplane.json"
interface sendingProps {
    size? : number;
    bgColor? : string
}

export default function Sending({size = 50, bgColor = ""}: sendingProps){
    const sending = (
        <Lottie 
        animationData={animationData}
        loop
        style={{width: size, height: size}}
        />
    )

    return (
        <div className={`${bgColor}`}>{sending}</div>
    )

    
}