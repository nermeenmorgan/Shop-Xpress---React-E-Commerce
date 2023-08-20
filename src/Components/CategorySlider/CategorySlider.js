import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './CategorySlider.module.css';
import Slider from 'react-slick';
import axios from 'axios';
import me from '../../assets/images/fsh.jpg'
import { toast } from 'react-hot-toast';
export default function CategorySlider () {
  const [categories, setCatogories] = useState([])
  async function getCategories(){

    let data= await (await axios.get("https://route-ecommerce.onrender.com/api/v1/categories")).data
    setCatogories(data.data)
    console.log("dataaaaaaaaaaaaaaaaaaaaa")
    console.log(data.data)
  }
  useEffect(()=>

{ 
   getCategories() ;
  // getCategories();
} ,[])
  // const [categories, setCatogories] = useState([])
// const imagesArr = ['https://media.istockphoto.com/id/1328836875/vector/realistic-electronic-devices-and-gadgets-in-isometry-vector-isometric-illustration-of.jpg?s=612x612&w=0&k=20&c=4iwItEQ1P3lhjl350QXRl5IrgC8ufDImaoc-7_H5vVA=',
// 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpOHb6_-MzVYLfn0FBU0HG5PYvJKxLjRdN7Q&usqp=CAU',
// "https://media.istockphoto.com/id/626085868/photo/mens-accessories.jpg?s=612x612&w=0&k=20&c=M4QqVxeUyMeChfMqOucfxtVaVMZ51g00-2tlc_Vgrx0=",
// `${me}`,
// "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvDGVLC_lQf_o04ZY7KhtS0H4Rh-I0PM1PWB3sC8w8zbQrMQmosd3dwMzPepxuoJtIRh8&usqp=CAU",
// "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3lrmoVDM2ATvfF3ervXOmT65AGCZf28L4gg&usqp=CAU",
// "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJAjX9QeZLAyKdXwKry0kcmjC8IzaRf6XePvPaVieXJ_P9RxygyFFJwX53U8DNIstM2vY&usqp=CAU"

// ]
// const categories =["Electronics", "Mobiles", "Men", "Women", "Home", "Beauty & Health","Boys & Toys"]


// useEffect(()=>
// { 
//   let {data}=  axios.get("https://fakestoreapi.com/products/categories");
// setCatogories(data);
// } ,[])
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1
  };
 return <>
 <h2 className='text-center mb-4'>Categories</h2>
  <Slider style={{marginBottom:30}} {...settings}>

 {categories && categories.map((category)=>
 <div key = {category._id}>
<img style={{borderRadius:30, marginRight:90, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'}} width={200} height={250}  src={category.image}/>
<h2 className="h6 pt-2 text-center">{category.name}</h2>
 </div>)}
  </Slider>
  </>

 }

