import React from "react";
import "components/DayListItem";
import DayListItem from "components/DayListItem";


export default function DayList(props) {

  const individualDays = props.days.map((day) => {
    return (
    <DayListItem 
    key={day.id}
    name={day.name}
    spots={day.spots}
    selected={day.name === props.day}
    setDay={props.setDay}
      />
    )
  });

  return (
    <ul>
      {individualDays}
    </ul>
  );
}