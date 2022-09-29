import moment from "moment";

export function getFormattedDate(date: Date): string {
  return moment(date).format("MM/DD/YYYY h:mm A");
}
