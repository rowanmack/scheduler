

export function getAppointmentsForDay(state, day) {
  let idArray = [];

  for (const element of state.days) {
    if (element.name === day) {
      idArray = element.appointments.map((x) => x);
    }
  }
  let resultArr = idArray.map((id) => {
    return state.appointments[id];
  });
  return resultArr;
}

export function getInterview(state, interview) {

  let resultObj = null

  


}

