import React, { useState } from 'react';
import { Table } from 'reactstrap';

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Calendar({calDate, daysWeek, monthArray, prevClickHandler, nextClickHandler, tableClickHandler}) {
    let date  = new Date();
    const year = calDate.year;
    const month = calDate.month;

    const weeks = daysWeek.map(((week, index) => {
        return <th className="day-week" key={index}>{week}</th>
    }));

    const months = monthArray[calDate.month];

    const years = year;

    function range(count) {
        let arr = [];
        
        for (let i = 1; i <= count; i++) {
            arr.push(i);
        }
        
        return arr;
    }

    function getLastDay(year, month) {
        let date = (new Date(year, month + 1, 0)).getDate();
        return date;
    }

    function getFirstWeekDay(year, month) {
        let date = (new Date(year, month, 1)).getDay();        
        if (date == 0) {
            return 6;
        } else {
            return date - 1;
        }
    }

    function getLastWeekDay(year, month) {
        let date = (new Date(year, month, getLastDay(year, month))).getDay();
        
        if (date == 0) {
            return 6;
        } else {
            return date - 1;
        }
    }    

    function normalize(arr, left, right) {
        let res = arr;
        for (let i = 0; i < left; i++) {
            res.unshift('');
        }
        for (var i = 0; i < right; i++) {
            res.push('');
        }
        
        return res;
    }
    
    function chunk(arr, n) {
        let result = [];
        let k = 0;
        let count = Math.ceil(arr.length / n);
        
        for (let i = 0; i < count; i++) {
            for (let j = 0; j < n; j++) {
                result.push(arr.splice(i * n, n));
                k++;
            }
        }
        
        return result;
    }

    function createTable(arr) {
        const tableContent = (
            <tbody>
                {arr.map((subArr, index) => {
                    return (
                        <tr key={index}>
                            {
                                subArr.map((elem, subIndex) => {
                                    let currDay1 = subArr[subIndex] + '-' + calDate.month + '-' + calDate.year;
                                    let currDay2 = date.getDate() + '-' + (date.getMonth()) + '-' + date.getFullYear();
                                    return ( 
                                        <td 
                                            className={currDay1 === currDay2 ? 'calendar-day active-day' : 'calendar-day'}
                                            key={subIndex}>
                                                {elem}
                                        </td>
                                    )
                                })
                            }
                        </tr>
                    )
                })}
            </tbody>
        )
        return tableContent;
    }

    function draw(year, month) {
        let arr = range(getLastDay(year, month));
        let firstWeekDay = getFirstWeekDay(year, month);
        let lastWeekDay  = getLastWeekDay(year, month);
        let nums = chunk(normalize(arr, firstWeekDay, 6 - lastWeekDay), 7);
        return createTable(nums)
    }

    let dayCalendar = draw(year, month);


    return (
        <div className="calendar">
            <header>
                <div className="calendar-date header-color">
                    <div className="calendar-month">{months}</div>
                    <div className="calendar-year">{years}</div>
                </div>
                <div className="calendar-arrow">
                    <div onClick={() => prevClickHandler()} className="arrow"><FontAwesomeIcon icon={faChevronLeft} /></div>
                    <div onClick={() => nextClickHandler()} className="arrow"><FontAwesomeIcon icon={faChevronRight} /></div>
                </div>
            </header>

            <Table size="sm" onClick={tableClickHandler}>
                <thead>
                    <tr>
                        {weeks}
                    </tr>
                </thead>
                {dayCalendar}
            </Table>
        </div>
    )
}

export default Calendar;