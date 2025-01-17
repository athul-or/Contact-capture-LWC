public with sharing class ContactController {
    @AuraEnabled
    public static String createContact(Contact contactRecord) {
        try {
            insert contactRecord;
            return 'Success: Contact has been saved!';
        } catch (Exception e) {
            return 'Error: ' + e.getMessage();
        }
    }
}