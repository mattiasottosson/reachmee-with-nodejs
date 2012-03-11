function daysLeft(endDate) { 
  var diff = new Date(endDate) - new Date();
  var days = Math.floor(diff/1000/3600/24+1);

  if(days < 0) { 
    return {className: 'days-0', text: '0 dagar kvar'} 
  }
  
  switch (days) {
    case 0:
      return {className: 'days-0', text: '0 dagar kvar'}
    case 1:
      return {className: 'days-1', text: '1 dag kvar'}
    default:
      return {className: 'days-'+days, text: days+' dagar kvar'}
  }
}

exports.daysLeft = daysLeft;

