import { LightningElement, track, wire } from 'lwc';
import getAccountsAndContacts from '@salesforce/apex/AccountContactController.getAccountsAndContacts';

export default class AccountContactTable extends LightningElement {
    @track accounts = [];

    @wire(getAccountsAndContacts)
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data.map(account => ({
                ...account,
                isExpanded: false,
                iconName: 'utility:chevronright' 
            }));
        } else if (error) {
            console.error(error);
        }
    }

    toggleSection(event) {
        const accountId = event.currentTarget.dataset.id;

        this.accounts = this.accounts.map(account => {
            if (account.account.Id === accountId) {
                const isExpanded = !account.isExpanded;
                return {
                    ...account,
                    isExpanded,
                    iconName: isExpanded ? 'utility:chevrondown' : 'utility:chevronright'
                };
            }
            return account;
        });
    }
}
