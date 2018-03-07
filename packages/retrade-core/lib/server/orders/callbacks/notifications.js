/*

Notifications for new posts and post approval.

*/

import Orders from '../../../modules/orders/collection.js'
import Users from 'meteor/vulcan:users';
import { addCallback } from 'meteor/vulcan:core';
import { createNotification } from '../../email/notifications.js';

/**
 * @summary Add notification callback when a post is approved
 */
function PaymentNotification (modifier, user, invoiceHtml) {
  console.log(invoiceHtml);
  if (modifier.paid) createNotification(modifier, 'orderPaidTemplate', {user: Users.findOne({_id: user})}, invoiceHtml);
}

addCallback('orders.edit.async', PaymentNotification);
