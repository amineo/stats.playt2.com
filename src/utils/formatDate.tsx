
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc') 
const timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)

export default function formatDate(d: string): string {
// 	const utcDate = dayjs.utc(d).add(17, 'hours');

// // https://api.playt2.com/game/2317
// // https://api.playt2.com/game/2288

// 	console.log(utcDate);
// 	console.log(dayjs.tz.guess());
// 	return dayjs.tz(utcDate).format('MM/DD/YYYY @ h:mm a');
return d.split(/[T]/)[0]
}