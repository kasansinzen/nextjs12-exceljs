import Swal, { SweetAlertOptions } from 'sweetalert2';

export const swalService = new class swalService {
  swalAlert(option: SweetAlertOptions, onDone: () => any = () => false): void {
    Swal.fire(option).then(result => {
      onDone();
    });
  }
  
  swalConfirm(option: SweetAlertOptions, onConfirm: () => any = () => false): void {
    Swal.fire({...option,
      showCancelButton: true,
      confirmButtonText: "Yes"
    }).then(result => {
      if(result.isConfirmed) onConfirm();
    })
  }
  
  swalToast(option: SweetAlertOptions, onDone?: () => any) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire(option);
  }
}