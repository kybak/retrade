import VulcanEmail from 'meteor/vulcan:email';

VulcanEmail.addTemplates({
  wrapper: Assets.getText("lib/server/email/templates/wrapper.handlebars"),
  orderPaid: Assets.getText('lib/server/email/templates/order-paid.handlebars')
});
