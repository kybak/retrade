import React from 'react'
import ReactDOM from 'react-dom'
import modalList from '../../imports/lib/modalList.jsx'

Meteor.startup(function() {
   Tracker.autorun(function() {
       const compName = FlowRouter.getQueryParam("m"), compInd = modalList.findIndex(comp => comp[0] === compName);

       if (compName && compInd > -1 && Session.get('modalLayoutReady')) {
               ReactDOM.render(
                   modalList[compInd][1],
                   document.getElementById('modal')
               );
       }

   })
});

export default Modal = {
    open(modalName) {
        Object.assign(document.getElementById('modal').style,{height:"100vh",width:"100vw"});
        FlowRouter.setQueryParams({m: modalName})
    }

}