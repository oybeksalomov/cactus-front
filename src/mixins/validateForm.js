export default {
    methods: {
        validateEmail(value) {
            // if the field is empty
            if (!value) {
                return 'This field is required';
            }
            // if the field is not a valid email
            const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            if (!regex.test(value)) {
                return 'This field must be a valid email';
            }
            // All is good
            return true;
        },
        validatePassword(value) {
            if(!value) {
                return 'This field is required';
            } else if(value.length < 6) {
                return 'Minimum 6 characters';
            }
            return true;
        },
        validateFirstName(value) {
            if(!value) {
                return 'This field is required';
            }
            const regex = /^[a-zA-Z]+$/;
            if (!regex.test(value)) {
                return 'First name must be only letters';
            }
            return true;
        },
        validateLastName(value) {
            if(!value) {
                return 'This field is required';
            }
            const regex = /^[a-zA-Z]+$/;
            if (!regex.test(value)) {
                return 'Last name must be only letters';
            }
            return true;
        }
    }
}