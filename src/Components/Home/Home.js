import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Home.module.css';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import { Link } from 'react-router-dom';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';
import { Helmet } from 'react-helmet';

export default function Home () {
  
  return<>
    <Helmet>
                <title>Home Page</title>
            </Helmet>
  <MainSlider></MainSlider>
<CategorySlider></CategorySlider>

    <FeaturedProducts></FeaturedProducts>

  
  </>
}





