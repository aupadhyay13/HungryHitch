import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotificationAlertService {
    public countUpdated = new Subject<any>();
    public loaderChanged = new BehaviorSubject<any>('');

    constructor(
        private toasterService: ToastrService,
        private router: Router
    ) {
    }

    parseErrorMessage(message : any) {
        let errorMessage = '';
        try {
            errorMessage = (JSON.parse(message)).message;
        } catch (e) {
            if (typeof message === 'object') {
                errorMessage = message.message;
            } else {
                errorMessage = message;
            }
        }
        return errorMessage;
    }

    showSuccess(message : any) {
        const successMessage = this.parseErrorMessage(message);
        this.toasterService.success('', successMessage);
    }

    showError(message: any) {
        const errorMessage = this.parseErrorMessage(message);
        this.toasterService.error('', message || "Something Went Wrong");
    }

    showWarning(message : any) {
        const warningMessage = this.parseErrorMessage(message);
        this.toasterService.warning('Warning', warningMessage);
    }

    showInfo(message : any) {
        const infoMessage = this.parseErrorMessage(message);
        this.toasterService.info('Info', infoMessage);
    }

    // changeLoader(key) {
    //     this.loaderChanged.next(key);
    //     const body = document.getElementsByTagName('body')[0];
    //     if (key) {
    //         document.body.scrollTop = 0; // For Safari
    //         document.documentElement.scrollTop = 0; // for chrome firefox etc.
    //         body.classList.add('body-noscroll');
    //     } else {
    //         body.classList.remove('body-noscroll');
    //     }
    // }
}
