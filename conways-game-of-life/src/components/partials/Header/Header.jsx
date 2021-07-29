// Imports
import React from 'react';
import Select from 'react-select';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

// App Imports
import presets from '../../../presets';

import './css/Header.css';
import customStyles from './headerSelectStyling';

import info from '../../../images/info-icon.svg';

// Header component
export default function Header({ onPressPlay, onPressReset, isSimulating, onChangeSpeed }) {
  return (
    <>
      <header id='main-header'>
        <div id='main-header__title'>
          <h1>Conway's Game of Life</h1>
          <h3>
            Implemented by <a href='https://github.com/Vimolicious'>Vimolicious</a>
          </h3>
        </div>
        <div id='main-header__buttons'>
          <Slider
            min={0}
            max={1000}
            reverse
            defaultValue={100}
            step={100}
            onChange={val => onChangeSpeed(val)}
          />
          <Select
            options={presets}
            onChange={option => console.log(option)}
            isSearchable={false}
            placeholder='Presets...'
            styles={customStyles}
          />
          <button onClick={() => onPressReset()}>Reset</button>
          <button onClick={() => onPressPlay()}>{isSimulating ? 'Pause' : 'Play'}</button>
          <a href='' className='btn icon'>
            <img src={info} alt='info' width='20' />
          </a>
        </div>
      </header>
    </>
  );
}
