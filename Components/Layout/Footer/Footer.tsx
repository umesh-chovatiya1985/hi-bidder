import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <>
      <div className="container-fluid mt-5 main-footer">
        <div className="">
          <div className="row px-xl-5 pt-5">
            <div className="col-lg-4 col-md-6 mb-5 pr-3 pr-xl-5">
              <h2 className="text-white text-4xl font-semibold mb-4">
                Hi! Bider:)
              </h2>
              <p className="mb-0">
                Lorem ipsum dolor sit amet, this a consectetur adipiscing elit,
                it do eiusmod incididunt aliqua.
              </p>
            </div>
          </div>
          <div className="row px-xl-5">
            <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
              <h5 className=" mb-4 font-semibold text-lg">Address</h5>
              <p className="mb-4">
                106, Patel Ave, near gurudwara, Thaltej, Ahmedabad, Gujarat
                380054
              </p>

              <p className="mb-3">
                <a href="mailto:aeliyainfo@gmail.com">
                  <i className="fa fa-envelope text-primary mr-3"></i>
                  aeliyainfo@gmail.com
                </a>
              </p>
              <p className="mb-0">
                <a href="tel:9726456102">
                  <i className="fa fa-phone text-primary mr-3"></i>+91 98252
                  00600
                </a>
              </p>
            </div>
            <div className="col-lg-8 col-md-12">
              <div className="row">
                <div className="col-md-3 mb-5">
                  <h5 className="mb-4 font-semibold text-lg">About</h5>
                  <div className="d-flex flex-column justify-content-start">
                    <Link href={"/contact-us"}>
                      <a className="mb-2 render">
                        <i className="fa fa-angle-right mr-2"></i>Contact Us
                      </a>
                    </Link>
                    <Link href={"/about-us"}>
                      <a className="mb-2 render">
                        <i className="fa fa-angle-right mr-2"></i>About Us
                      </a>
                    </Link>
                    <Link href={"/careers"}>
                      <a className="mb-2 render">
                        <i className="fa fa-angle-right mr-2"></i>Careers
                      </a>
                    </Link>
                    <Link href={"/become-a-seller"}>
                      <a className="mb-2 render">
                        <i className="fa fa-angle-right mr-2"></i>Seller
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="col-md-3 mb-5">
                  <h5 className="mb-4 font-semibold text-lg">
                    Buying with {process.env.COMPANY_NAME}
                  </h5>
                  <div className="d-flex flex-column justify-content-start">
                    <Link href={"/help/placing-your-bid"}>
                      <a className="mb-2">
                        <i className="fa fa-angle-right mr-2"></i>Placing your
                        bid
                      </a>
                    </Link>
                    <Link href={"/help/fair-business-practice"}>
                      <a className="mb-2">
                        <i className="fa fa-angle-right mr-2"></i>Fair business
                        practice
                      </a>
                    </Link>
                    <Link href={"/help/law-enforcement-guidelines"}>
                      <a className="mb-2">
                        <i className="fa fa-angle-right mr-2"></i>Law
                        Enforcement Guidelines
                      </a>
                    </Link>
                    <Link href={"/help/notarial-supervision"}>
                      <a className="mb-2">
                        <i className="fa fa-angle-right mr-2"></i>Notarial
                        supervision
                      </a>
                    </Link>
                    <Link href={"/help/buyer-terms"}>
                      <a className="mb-2">
                        <i className="fa fa-angle-right mr-2"></i>Buyer terms
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="col-md-3 mb-5">
                  <h5 className="mb-4 font-semibold text-lg">
                    Selling with {process.env.COMPANY_NAME}
                  </h5>
                  <div className="d-flex flex-column justify-content-start">
                    <Link href={"/help/selling-at-auction"}>
                      <a className="mb-2">
                        <i className="fa fa-angle-right mr-2"></i>Selling at
                        auction
                      </a>
                    </Link>
                    <Link href={"/help/photo-tips"}>
                      <a className="mb-2">
                        <i className="fa fa-angle-right mr-2"></i>Photo tips
                      </a>
                    </Link>
                    <Link href={"/help/seller-terms"}>
                      <a className="mb-2">
                        <i className="fa fa-angle-right mr-2"></i>Seller terms
                      </a>
                    </Link>
                    <Link href={"/help/submission-guidelines"}>
                      <a className="mb-2">
                        <i className="fa fa-angle-right mr-2"></i>Submission
                        guidelines
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="col-md-3 mb-5">
                  <h5 className="mb-4 font-semibold text-lg">Policy</h5>
                  <div className="d-flex flex-column justify-content-start">
                    <Link href={`/policy/return-policy`}>
                      <a className="mb-2">
                        <i className="fa fa-angle-right mr-2"></i>Return Policy
                      </a>
                    </Link>
                    <Link href={`/policy/terms-of-use`}>
                      <a className="mb-2">
                        <i className="fa fa-angle-right mr-2"></i>Terms Of Use
                      </a>
                    </Link>
                    <Link href={`/policy/security`}>
                      <a className="mb-2">
                        <i className="fa fa-angle-right mr-2"></i>Security
                      </a>
                    </Link>
                    <Link href={`/policy/privacy-policy`}>
                      <a className="mb-2">
                        <i className="fa fa-angle-right mr-2"></i>Privacy Policy
                      </a>
                    </Link>
                    <Link href={`/sitemap`}>
                      <a className="mb-2">
                        <i className="fa fa-angle-right mr-2"></i>Sitemap
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row border-top mx-xl-5 py-4">
            <div className="col-md-6 px-xl-0">
              <p className="mb-md-0 text-secondary">
                &copy; <a className="text-primary">2022</a> All Rights Reserved.
                Designed by
                <a
                  className="text-primary ml-2"
                  href={process.env.COMPANY_URL!}
                  target="_blank"
                >
                  {process.env.COMPANY_NAME!}
                </a>
              </p>
            </div>
            <div className="col-md-6 px-xl-0 text-right">
              <img
                className="img-fluid"
                src="/img/payments.png"
                alt="Payments"
              />
            </div>
          </div>
        </div>
      </div>
      <a href="#" className="btn btn-primary back-to-top hide">
        <i className="fa fa-angle-double-up"></i>
      </a>
    </>
  );
};
