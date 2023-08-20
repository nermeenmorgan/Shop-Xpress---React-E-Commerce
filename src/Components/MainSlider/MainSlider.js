import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import axios from 'axios';
import img1 from '../../assets/images/slider1.png'
import img2 from '../../assets/images/slider2.png'
import img3 from '../../assets/images/slider3.png'
import img4 from '../../assets/images/slider4.png'
import img5 from '../../assets/images/slider5.png'
import img6 from '../../assets/images/slider6.png'
import img7 from '../../assets/images/slider7.png'
import img8 from '../../assets/images/slider8.png'
export default function MainSlider () {
  // const [categories, setCatogories] = useState([])
const imagesArr = [
  `${img1}`,
  `${img2}`,
  `${img3}`,
  `${img8}`,
  `${img4}`,
  `${img5}`,
  `${img6}`,
  `${img7}`,

]

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };
 return <>
  <Slider style={{marginBottom:50}} {...settings}>

  
 {imagesArr.map((img, index)=>
 <div key={index} className='row mb-2'>
<img style={{borderRadius:20, width:'100%', marginBottom:5}} height={500} key={index} src={img}/>
</div>
  )}

  {/* {imagesArr.map((img,index)=>
 <div key={index} className='row'>
<img style={{borderRadius:30, marginRight:20, width:"100%"}}   key={index} src={img}/>

</div>
  )} */}



  </Slider>
  </>
}


