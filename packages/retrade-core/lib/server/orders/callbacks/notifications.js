

import Orders from '../../../modules/orders/collection.js'
import Users from 'meteor/vulcan:users';
import { addCallback } from 'meteor/vulcan:core';
import { createNotification } from '../../email/notifications.js';

/**
 * @summary Add notification callback when a post is approved
 */
function PaymentNotification (modifier, user, invoiceHtml) {
  if (modifier.paid) createNotification(modifier, 'orderPaidTemplate', {user: Users.findOne({_id: user})}, invoiceHtml);
  Orders.update({_id: modifier._id}, {$set: {invoiceDate: new Date()}});
}

addCallback('orders.edit.async', PaymentNotification);
