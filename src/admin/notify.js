import Swal from 'sweetalert2';

export const notifySaved = (title = 'Saved') =>
  Swal.fire({
    icon: 'success',
    title,
    timer: 1200,
    showConfirmButton: false,
  });

export const notifyError = (error) =>
  Swal.fire({
    icon: 'error',
    title: 'Something went wrong',
    text: error?.message ?? String(error),
  });

export const confirmDelete = async (name) =>
  (
    await Swal.fire({
      icon: 'warning',
      title: `Delete "${name}"?`,
      text: 'This cannot be undone.',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#b3261e',
    })
  ).isConfirmed;
