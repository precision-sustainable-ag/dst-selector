// import moment from 'moment-timezone';

// const getMonthDayString = (type = '', crop = {}) => {
//   switch (type) {
//     case 'reliable': {
//       const startDate = moment(crop['Reliable Establishment/Growth Start'], 'YYYY-MM-DD');
//       const endDate = moment(crop['Reliable Establishment/Growth End'], 'YYYY-MM-DD');

//       return `${startDate.format('MM/DD')} - ${endDate.format('MM/DD')}`;
//     }
//     case 'reliable-second': {
//       const startDate = moment(crop['Second Reliable Establishment/Growth Start'], 'YYYY-MM-DD');
//       const endDate = moment(crop['Second Reliable Establishment/Growth End'], 'YYYY-MM-DD');

//       return `${startDate.format('MM/DD')} - ${endDate.format('MM/DD')}`;
//     }
//     case 'temperature': {
//       if (
//         crop['Temperature/Moisture Risk to Establishment Start']
//         && crop['Temperature/Moisture Risk to Establishment End']
//       ) {
//         const startDate = moment(
//           crop['Temperature/Moisture Risk to Establishment Start'],
//           'YYYY-MM-DD',
//         );
//         const endDate = moment(
//           crop['Temperature/Moisture Risk to Establishment End'],
//           'YYYY-MM-DD',
//         );
//         return `${startDate.format('MM/DD')} - ${endDate.format('MM/DD')}`;
//       }
//       return 'N/A';
//     }
//     case 'temperature-second': {
//       const startDate = moment(
//         crop['Second Temperature/Moisture Risk to Establishment Start'],
//         'YYYY-MM-DD',
//       );
//       const endDate = moment(
//         crop['Second Temperature/Moisture Risk to Establishment End'],
//         'YYYY-MM-DD',
//       );
//       return `${startDate.format('MM/DD')} - ${endDate.format('MM/DD')}`;
//     }
//     default:
//       return '';
//   }
// };

// export default getMonthDayString;
