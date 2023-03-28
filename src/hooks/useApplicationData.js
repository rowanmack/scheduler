import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  function updateSpots(state, newAppnts, id) {
    let spots = {
      dayID: 0,
      appointments: [],
      remainingSpots: 0
    };

    for (let day of state.days) {
      if (day.appointments.includes(id)) {
        spots.appointments = [...day.appointments];
        spots.dayID = day.id;
      }
    };

    spots.appointments.forEach(appntID => {
      if (newAppnts[appntID] && newAppnts[appntID].interview === null) {
        spots.remainingSpots++;
      }
    });

    const updatedDay = {
      ...state.days[spots.dayID - 1],
      spots: spots.remainingSpots
    };

    const days = [...state.days];
    days[spots.dayID - 1] = updatedDay;

    return days;
  }

  const bookInterview = (id, interview) => {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(state, appointments, id);

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState(prev => ({
          ...prev,
          days,
          appointments
        })
        );
      });
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(state, appointments, id);

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState(prev => ({
          ...prev,
          days,
          appointments
        })
        );
      });
  };

  return { state, setDay, bookInterview, cancelInterview };
};