public with sharing class AccountContactController {
    @AuraEnabled(cacheable=true)
    public static List<AccountWrapper> getAccountsAndContacts() {
        List<AccountWrapper> accountWrappers = new List<AccountWrapper>();

        List<Account> accounts = [
            SELECT Id, Name
            FROM Account
            LIMIT 10
        ];

        for (Account acc : accounts) {
            List<Contact> contacts = [
                SELECT Id, Name, Email, MailingStreet, MailingCity
                FROM Contact
                WHERE AccountId = :acc.Id
                LIMIT 5
            ];
            accountWrappers.add(new AccountWrapper(acc, contacts));
        }

        return accountWrappers;
    }

    public class AccountWrapper {
        @AuraEnabled public Account account { get; set; }
        @AuraEnabled public List<Contact> contacts { get; set; }

        public AccountWrapper(Account account, List<Contact> contacts) {
            this.account = account;
            this.contacts = contacts;
        }
    }
}
