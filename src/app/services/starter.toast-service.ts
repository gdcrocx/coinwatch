import { Injectable } from '@angular/core';

import { Toast } from '@ionic-native/toast';

@Injectable()
export class ToastService {
    message: String;
    duration: String;
    position: String;
    styling: Object;
    options: Object;

    constructor(private toast: Toast) {
        this.message = null;
        this.position = "center";
        this.duration = "long";
        this.styling = {
            opacity: 0.75, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
            backgroundColor: '#FF0000', // make sure you use #RRGGBB. Default #333333
            textColor: '#FFFF00', // Ditto. Default #FFFFFF
            textSize: 20.5, // Default is approx. 13.
            cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
            horizontalPadding: 20, // iOS default 16, Android default 50
            verticalPadding: 16 // iOS default 12, Android default 30
        }
    }

    showToast(message, position, duration) {
        
        let localPosition = null;
        let localDuration = null;

        if (position != null)
        {
            localPosition = position;
        }
        else {
            localPosition = this.position;
        }

        if (duration != null)
        {
            localDuration = duration;
        }
        else {
            localDuration = this.duration;
        }

        this.options = {
            message: "Hey there",
            duration: localPosition, // 2000 ms
            position: localDuration,
            styling: this.styling
        }
        this.toast.showWithOptions(this.options).subscribe(
            toast => {
                console.log(toast);
            }
        );
    }

    hideToast() {
        this.toast.hide();
    }
}