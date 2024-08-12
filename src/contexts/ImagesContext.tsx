import React, {useEffect} from 'react';
import axios from "axios";

export const ImgContext = React.createContext<string[]>([]);

function ImagesContext({children}: { children: React.ReactNode }) {
    const [images, setImages] = React.useState<string[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await axios.get("https://picsum.photos/v2/list?page=4&limit=50")
                setImages(res.data.map((item: any) => item.download_url))
            } catch (e) {
                console.error(e)
            }
        }

        fetchImages()
    }, []);

    return (
        <ImgContext.Provider value={images}>
            {children}
        </ImgContext.Provider>
    )
}

export default ImagesContext;