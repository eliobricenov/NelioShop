import { AbstractControl } from '@angular/forms';

export class CustomValidators {
    static emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
    static passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    /**
     * Method to check if the value of both password inputs are the same
     * In order this to work the formcontrols need to be named as used below
     * @param control formGroup to evaluate
     */
    static passMatcher(control: AbstractControl): { [key: string]: boolean } {
        const pass = control.get('password').value;
        const confirm = control.get('passwordConfirm').value;
        if (!pass || !confirm) {
            return null;
        }
        return pass === confirm ? null : { noPassMatch: true };
    }

    /**
     * Method to check if the value of both email inputs are the same
     * In order this to work the formcontrols need to be named as used below
     * @param control formGroup to evaluate
     */
    static emailMatcher(control: AbstractControl): { [key: string]: boolean } {
        const email = control.get('email').value;
        const confirm = control.get('emailConfirm').value;
        if (!email || !confirm) {
            return null;
        }
        return email === confirm ? null : { noEmailMatch: true };
    }

    static isNumber(posibleNumber: string | number): boolean {
        return !isNaN(Number(posibleNumber.toString()));
    }

    

}
