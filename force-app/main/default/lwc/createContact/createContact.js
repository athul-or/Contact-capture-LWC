import { LightningElement, track } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { createRecord } from "lightning/uiRecordApi";

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
    // Prepare the Contact record
    const fields = {
      FirstName: this.contact.FirstName,
      LastName: this.contact.LastName,
      Email: this.contact.Email,
      Phone: this.contact.Phone,
      MailingStreet: this.contact.MailingStreet,
      MailingCity: this.contact.MailingCity,
      MailingState: this.contact.MailingState,
      MailingPostalCode: this.contact.MailingPostalCode,
      MailingCountry: this.contact.MailingCountry,
    };

    const recordInput = { apiName: "Contact", fields };

    // Use createRecord to save the Contact
    createRecord(recordInput)
      .then((result) => {
        this.showToast("Success", "Contact created successfully!", "success");
        this.clearForm();
      })
      .catch((error) => {
        this.showToast("Error", "Unable to save contact. " + error.body.message, "error");
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

    this.template
      .querySelectorAll("lightning-input, lightning-textarea")
      .forEach((input) => {
        input.value = "";
      });
  }
}
