export const getFieldnameFromKey = (key) => {
	switch (key) {
	  case 'registered_date_from':
	    return 'Registered Date From';
	  case 'registered_date_to':
	    return 'Registered Date To';
	  case 'letter_date_from':
	    return 'Letter Date From';
	  case 'letter_date_to':
	    return 'Letter Date To';
	  case 'start_date':
	    return 'Start Date';
	  case 'end_date':
	    return 'End Date';
	  case 'reservation_date_from':
	    return 'Reservation Date From';
	  case 'reservation_date_to':
	    return 'Reservation Date To';
    
	  default:
	    return key;
	}
      };