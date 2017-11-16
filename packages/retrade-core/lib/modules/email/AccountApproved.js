import VulcanEmail from 'meteor/vulcan:email';

VulcanEmail.addTemplates({
  accountApproved: Assets.getText('../../public/email-templates/account-approved.handlebars')
});

VulcanEmail.addEmails({

  accountApproved: {
    template: "accountApproved",
    path: "/email/account-approved/:_id?",
    subject(data) {
      const user = _.isEmpty(data) ? {displayName: '[user]'} : data.UsersSingle;
      return "Welcome ${user.displayName}! Your account has been approved.";
    },
    query: `
      query UsersSingleQuery($documentId: String){
        UsersSingle(documentId: $documentId){
          displayName
        }
        SiteData{
          title
          url
        }
      }
    `
  }

});
