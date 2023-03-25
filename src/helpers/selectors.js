

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

export function getInterviewersForDay (state, day) {

  let interviewerIdArray = [];

  for (const element of state.days) {
    if (element.name === day) {
      interviewerIdArray = element.interviewers.map((x) => x);
    }
  }
  let resultArr = interviewerIdArray.map((id) => {
    return state.interviewers[id];
  });
  return resultArr;

}

export function getInterview(state, interview) {

  let resultObj = {}

  if(!interview) {
    return null
  }

   resultObj = { ...interview }
  let interviewerID = interview.interviewer
  let interviewerObj = state.interviewers[interviewerID]
  resultObj.interviewer = {...interviewerObj}

  return resultObj
}

