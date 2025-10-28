import Lottie from "lottie-react";
import animationData from "@/public/Loading/loading.json"

interface LoaderProps {
    fullscreen?: boolean;
    size?: number;
    bgColor?: string
}

export default function Loader({fullscreen = false, size = 400, bgColor = "bg-white"}: LoaderProps){
    const loader = (
        <Lottie
            animationData={animationData}
            loop={true}
            style={{width: size, height: size}}
        />
    )

    if(fullscreen){
        return (
            <div className={`fixed inset-0 flex items-center justify-center z-50 ${bgColor}`}>{loader}</div>
        )
    }

    return loader;
}