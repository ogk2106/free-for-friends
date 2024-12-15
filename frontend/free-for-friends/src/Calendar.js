import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function Calendar() {
    return(
        <main>
            <div className="calendar-container">
                <div className="month">Dec 2024</div>
                <div className="calendar">
                    <div className="row header-row">
                        <div className="week">SUN</div>
                        <div className="week">MON</div>
                        <div className="week">TUE</div>
                        <div className="week">WED</div>
                        <div className="week">THU</div>
                        <div className="week">FRI</div>
                        <div className="week">SAT</div>
                    </div>
                    <div className="row">
                        <div className="day">1</div>
                        <div className="day">2</div>
                        <div className="day">3</div>
                        <div className="day">4</div>
                        <div className="day">5</div>
                        <div className="day">6</div>
                        <div className="day">7</div>
                    </div>
                    <div className="row">
                        <div className="day">8</div>
                        <div className="day">9</div>
                        <div className="day">10</div>
                        <div className="day">11</div>
                        <div className="day">
                            12
                            <div className="event">5pm Christmas Spect...</div>
                            <div className="event">9pm Discover Pottery</div>
                        </div>
                        <div className="day">13</div>
                        <div className="day">14</div>
                        <div className="day">15</div>
                        <div className="day">16</div>
                        <div className="day">17</div>
                        <div className="day">18</div>
                        <div className="day">19</div>
                        <div className="day">20</div>
                        <div className="day">21</div>
                        <div className="day">22</div>
                        <div className="day">23</div>
                        <div className="day">24</div>
                        <div className="day">25</div>
                        <div className="day">26</div>
                        <div className="day">27</div>
                        <div className="day">28</div>
                    </div>
                    <div className="row">
                        <div className="day">29</div>
                        <div className="day">30</div>
                        <div className="day">
                            31
                            <div className="event">10pm New Year's Eve</div>
                        </div>
                        <div className="day">Jan 1</div>
                        <div className="day">2</div>
                        <div className="day">3</div>
                        <div className="day">4</div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Calendar;