import { LightningElement, track } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent"; 
import createContact from "@salesforce/apex/ContactController.createContact";

export default class CreateContact extends LightningElement {
  @track contact = {
    FirstName: "",
    LastName: "",
    Email: "",
    Phone: "",
    MailingStreet: "",
    MailingCity: "",
    MailingState: "",
    MailingPostalCode: "",
    MailingCountry: "",
  };

  handleInputChange(event) {
    const field = event.target.name;
    this.contact[field] = event.target.value;
  }

  saveContact() {
    createContact({ contactRecord: this.contact })
      .then((result) => {
        this.showToast("Success", "Contact created successfully!", "success");
        this.clearForm();
      })
      .catch((error) => {

        this.showToast(
          "Error",
          "Unable to save contact. " + error.body.message,
          "error"
        );
      });
  }


  showToast(title, message, variant) {
    const event = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant,
    });
    this.dispatchEvent(event);
  }


  clearForm() {
    this.contact = {
      FirstName: "",
      LastName: "",
      Email: "",
      Phone: "",
      MailingStreet: "",
      MailingCity: "",
      MailingState: "",
      MailingPostalCode: "",
      MailingCountry: "",
    };

    this.template.querySelectorAll("lightning-input, lightning-textarea").forEach((input) => {
      input.value = "";
    });
  }
}
