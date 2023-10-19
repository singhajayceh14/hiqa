import React, { memo } from 'react';
import CountdownTimer from './Counter';

function Index() {
  return (
    <>
      <section className="container_wrap">
        <div className="banner-img">
          <img src="http://api.hiqa.in/img/uploads/slider/slider_bg.png" alt="" className="image" />
        </div>
        <img src="https://hiqa.in/assets/img/logo/11.png" alt="" />
        <header>Coming Soon</header>
        <p>
          We are excited to announce that we will be launching soon and can't wait to share our new platform with you.
        </p>
        <CountdownTimer />
      </section>
      <style>
        {`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
.container_wrap {
  display: flex;
  row-gap: 25px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  padding: 0 15px;
  overflow: hidden;
}
.container_wrap .image {
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: -1;
    left: 0;
    top: 0;
}
.banner-img + img {
    max-width: 230px;
    background: #ffff;
    border-radius: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
}

section.container_wrap {
    position: relative;
}

section.container_wrap:after {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    background: rgb(0 0 0 / 40%);
    z-index: -1;
}
body::after {
  position: absolute;
  content: "";
  top: 0;
  height: 100%;
  width: 100%;
  background: #000;
  z-index: -1;
  opacity: 0.2;
}
.container_wrap header {
  font-size: 60px;
  color: #fff;
  font-weight: 600;
  text-align: center;
  line-height:1.4;
}
.container_wrap p {
  font-size: 18px;
  font-weight: 400;
  color: #fff;
  max-width: 550px;
  text-align: center;
  margin-bottom: 0;
}
.container_wrap .time-content {
  display: flex;
  column-gap: 30px;
  align-items: center;
  margin: 2rem;
  border: 1px solid white;
  padding: 2rem 2.5rem;
  border-radius: 0.5rem;
  background: rgba(250, 250, 250, 0.2);
}
.time-content .time {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.time .number {
  font-weight: 800;
  font-size: 65px;
  line-height: 1;
  color: #eee;
}
.time .text {
  text-transform: capitalize;
  color: #fff;
  font-weight: 600;
  font-size: 12px;
}
.email-content {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
}
.email-content p {
  font-size: 13px;
}
.input-box {
  display: flex;
  align-items: center;
  height: 40px;
  max-width: 360px;
  width: 100%;
  margin-top: 20px;
  column-gap: 20px;
}
.input-box input,
.input-box button {
  height: 100%;
  outline: none;
  border: none;
  border: 1px solid #fff;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: 400;
}
.input-box input {
  width: 100%;
  padding: 0 15px;
  color: #fff;
}
input::placeholder {
  color: #fff;
}
.input-box button {
  cursor: pointer;
  background-color: #eee;
  color: #0d6a81;
  white-space: nowrap;
  padding: 0 20px;
  transition: all 0.3s ease;
}
.input-box button:hover {
  background-color: #fff;
}

@media screen and (max-width: 575px) {
  .container_wrap header {
    font-size: 24px;
  }
  .container_wrap p{
  	font-size: 14px;
  }
  .time .number {
	    font-size: 22px;
	}
}

`}
      </style>
    </>
  );
}

export default memo(Index);
