import {EventPosition} from "../../components/event/EventComponent";
import {datesAreOnSameDay} from "../../utils";

const pixelsPerHour = 66;
const pixelsPerMinute = pixelsPerHour / 60;
const marginTop = 56;

export const calculateWeekPopUpTop = (startTime: Date): number => {
  return calculateTop(startTime)
}

export const calculateEventTop = (startTime: Date, day: Date, gap: number): number => {
  let top = 56;
  if (datesAreOnSameDay(startTime, day)) {
    top = calculateTop(startTime) + gap;
  }

  return top;
};


export const calculateEventHeight = (startDate: Date, endDate: Date, currentDay: Date): number => {

  const startTimeTime = startDate.getTime();
  const endTime = endDate.getTime();
  let height = 0;
  if (datesAreOnSameDay(startDate, endDate)) {

    const duration = endTime - startTimeTime;
    const durationInHours = duration / 1000 / 60 / 60;
    height = durationInHours * 66
  }
  else if (datesAreOnSameDay(startDate, currentDay)) {

    currentDay.setHours(23, 59, 59, 59);
    const duration = currentDay.getTime() - startTimeTime;
    const durationInHours = duration / 1000 / 60 / 60;
    height = durationInHours * 66
  }
  else if (datesAreOnSameDay(endDate, currentDay)) {

    currentDay.setHours(0, 0, 0, 0);
    const duration = endTime - currentDay.getTime();
    const durationInHours = duration / 1000 / 60 / 60;
    height = durationInHours * 66
  }
  return height;
}

const calculateTop = (startTime: Date): number => {
  let top = 56
  const startTimeHours = startTime.getHours();
  const startTimeMinutes = startTime.getMinutes();
  top =
    startTimeHours * pixelsPerHour +
    startTimeMinutes * pixelsPerMinute +
    marginTop;

  return top;

}

export const calculateLeft = (otherEventsPosition: EventPosition[], eventPosition: EventPosition) => {

  if (otherEventsPosition.length === 0) {
    return 0;
  }
  let overlap: number = 0;
  otherEventsPosition.forEach((otherEventPosition) => {
    if (eventPosition.top >= otherEventPosition.top && eventPosition.top <= otherEventPosition.bottom) {
      overlap++;
    }
    else if (eventPosition.bottom >= otherEventPosition.top && eventPosition.bottom <= otherEventPosition.bottom) {
      overlap++;
    }
    else if (eventPosition.top <= otherEventPosition.top && eventPosition.bottom >= otherEventPosition.bottom) {
      overlap++;
    }
    else if (eventPosition.top >= otherEventPosition.top && eventPosition.bottom <= otherEventPosition.bottom) {
      overlap ++;
    }}
  )
  return overlap * 15;
};
