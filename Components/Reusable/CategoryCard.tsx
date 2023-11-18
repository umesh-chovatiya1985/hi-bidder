import Link from 'next/link'
import React, { useState } from 'react'

export default function CategoryCard({ category }: any) {
    const [src, setSrc] = useState(`/images/` + category.image);
    const mystyle = {
        background: category.color + "40"
    };
    return (
        <>
            <div className="extra1" style={mystyle}>
                <Link href={`/category/${encodeURIComponent(category.slug)}`}>
                    <a className="text-decoration-none">
                        <div className="box-p d-flex h-100">
                            <div className="flex-fill pl-3">
                                <h6>{category.title}</h6>
                                <span className="text-body">
                                    Shop Now
                                </span>
                            </div>
                            <div className="overflow-hidden">
                                <img onError={() => setSrc('/img/default.jpg')} className="img-fluid w-100" src={src} alt={category.title} />
                            </div>
                        </div>
                    </a>
                </Link>
            </div>
        </>
    )
}
