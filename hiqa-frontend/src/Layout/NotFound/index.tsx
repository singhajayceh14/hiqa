import React, { memo } from 'react';
import Link from 'next/link';

function EventDetails() {
  return (
    <>
      <section className="page_404 align-items-center pb-120 pt-120 p-relative">
        <div className="container">
          <div className="row">
            <div className="col-sm-12  col-sm-offset-1  text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center ">404</h1>
              </div>

              <div className="contant_box_404">
                <h3 className="h2">Look like you're lost</h3>

                <p>The page you are looking for not avaible!</p>
              </div>
              <div className="slider-btn">
                <Link href="/" className="btn ss-btn smoth-scroll">
                  Home <i className="fal fa-long-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>
        {`
          /*======================
              404 page
          =======================*/
          
          
          .four_zero_four_bg{
           
           background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
              height: 400px;
              background-position: center;
           }
           
           
           .four_zero_four_bg h1{
           font-size:80px;
           }
           
            .four_zero_four_bg h3{
                 font-size:80px;
                 }
                 
                 .link_404{			 
            color: #fff!important;
              padding: 10px 20px;
              background: #39ac31;
              margin: 20px 0;
              display: inline-block;}
            .contant_box_404{ margin-top:-50px;}
          `}
      </style>
    </>
  );
}

export default memo(EventDetails);
