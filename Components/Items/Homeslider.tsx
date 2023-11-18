import Link from 'next/link';
import React from 'react'

const Homeslider = ({image}: any) => {
  return (
    <>
        <div className="carousel-item position-relative border-radius-8" >
            <img className="position-absolute w-100 h-100 object-fit-cover border-radius-8" alt={image.hTitle} src={'images/slider/'+image.image} />
            {image.hTitle && <div className="carousel-caption d-flex flex-column align-items-center justify-content-center  border-radius-8">
                <div className="p-3 max-width-700">
                    <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                        {image.hTitle}
                    </h1>
                    {image.contentTitle && <p className="mx-md-5 px-5 animate__animated animate__bounceIn">{image.contentTitle}</p>}
                    {image.linkTitle && 
                        <Link href={image.linkUrl}>
                            <a className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp">{image.linkTitle}</a>
                        </Link>
                    }
                </div>
            </div>}
        </div>
    </>
  )
}

export default Homeslider;