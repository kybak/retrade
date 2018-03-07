import Users from 'meteor/vulcan:users';
import VulcanEmail from 'meteor/vulcan:email';
import {getSetting, registerSetting} from 'meteor/vulcan:core';
const pdf = require('html-pdf');

registerSetting('emailNotifications', true, 'Enable email notifications');

export const createNotification = (modifier, notificationName, variables, invoiceHtml) => {

  if (modifier.paid) {
    pdf.create(invoiceHtml).toBuffer(function(err, buffer){
      const invoice = buffer;
      const emailName = notificationName;

      const to = variables.user.emails[0].address;

      if (to) {
        VulcanEmail.buildAndSend({to: 'tokylebaker@gmail.com', emailName, variables: {name: variables.user.username}, attachments: [{filename: "retrade-invoice.pdf", content: invoice}]});
      } else {
        console.log(`// Couldn't send notification: user ${user._id} doesn't have an email`); // eslint-disable-line
      }
    });


  }

};
