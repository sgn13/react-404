export const getReservationStatus = (reservationStatus) => {
  switch (reservationStatus) {
    case 'approval_pending':
      return 'Approval pending';
    case 'conf_pending':
      return 'Confirmation pending';
    case 'res_complete':
      return 'Reservation confirmed';
    case 'tr_complete':
      return 'Trip complete';
    case 'res_cancelled':
      return 'Reservation cancelled';
    case 'approval_rejected':
      return 'Approval rejected';
    case 'conf_rejected':
      return 'Confirmation rejected';
    default:
      return '';
  }
};
