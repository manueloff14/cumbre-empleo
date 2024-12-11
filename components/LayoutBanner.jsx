"use client"

import { useState } from 'react'
import Banner from './Banner'

export default function LayoutBanner() {
    
    const [hasBannerBeenShown, setHasBannerBeenShown] = useState(false);
    
    return (
        <>
            {!hasBannerBeenShown && (
                <Banner setHasBannerBeenShown={setHasBannerBeenShown} />
            )}
        </>
    )
}