import { LightningElement, track } from 'lwc';
import createContact from '@salesforce/apex/ContactController.createContact';

export default class CreateContact extends LightningElement {
    @track contact = {
        FirstName: '',
        LastName: '',
        Email: '',
        Phone: '',
        MailingStreet: ''
    };
    @track message = '';
    @track error = false;

    handleInputChange(event) {
        const field = event.target.name;
        this.contact[field] = event.target.value;
    }

    saveContact() {
        createContact({ contactRecord: this.contact })
            .then(result => {
                this.message = result;
                this.error = false;
            })
            .catch(error => {
                this.message = 'Error: Unable to save contact. ' + error.body.message;
                this.error = true;
            });
    }

    get hasMessage() {
        return this.message !== '';
    }
}
