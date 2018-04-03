import React from 'react';
import { registerComponent, withEdit } from 'meteor/vulcan:core';
import Inventory from '../../../modules/inventory/collection.js'
import TextField from 'material-ui/TextField';
import styled from 'styled-components'
import {ButtonPrimary} from '../../common/presentational-components/buttons/ButtonPrimary.js'
// import ComponentContainer from '../common/layouts/body/ComponentContainer.jsx'


const DialogContainer = styled.div`
    padding: 50px;
`;

class EditPart extends React.Component {

    constructor(props) {
        super(props);

        const item = props.part;

        this.state = {
            _id: item._id,
            itemNumber: item.itemNumber,
            itemName: item.itemName,
            accountCode: item.accountCode,
            customerRelation: item.customerRelation,
            externalItemNumber: item.externalItemNumber,
            mfm: item.mfm,
            info: item.info,
            multiple: item.multiple,
            price: item.price,
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSubmit = () => {
        let set = {...this.state};
        delete set._id;

        this.props
            .editMutation({
                documentId: this.state._id,
                set: set
            })
            .then(this.props.closeDrawer())
            .catch((err)=>console.log(err));
    };


    render() {
        return (
            <DialogContainer className="flex-column align-center">
                <h1>EDITING</h1>

                <TextField
                    id="itemNumber"
                    label="Item Number"
                    style={{width: "288px"}}
                    value={this.state.itemNumber}
                    onChange={this.handleChange('itemNumber')}
                    margin="normal"
                />

                <TextField
                    id="itemName"
                    style={{width: "288px"}}
                    label="Item Name"
                    value={this.state.itemName}
                    onChange={this.handleChange('itemName')}
                    margin="normal"
                />

                <TextField
                    id="accountCode"
                    style={{width: "288px"}}
                    label="Account Code"
                    value={this.state.accountCode}
                    onChange={this.handleChange('accountCode')}
                    margin="normal"
                />

                <TextField
                    id="customerRelation"
                    style={{width: "288px"}}
                    label="Customer Relation"
                    value={this.state.customerRelation}
                    onChange={this.handleChange('customerRelation')}
                    margin="normal"
                />

                <TextField
                    id="externalItemNumber"
                    style={{width: "288px"}}
                    label="External Item Number"
                    value={this.state.externalItemNumber}
                    onChange={this.handleChange('externalItemNumber')}
                    margin="normal"
                />

                <TextField
                    id="mfm"
                    style={{width: "288px"}}
                    label="MFM"
                    value={this.state.mfm}
                    onChange={this.handleChange('mfm')}
                    margin="normal"
                />

                <TextField
                    id="info"
                    style={{width: "288px"}}
                    label="Info"
                    value={this.state.info}
                    onChange={this.handleChange('info')}
                    margin="normal"
                />

                <TextField
                    id="multiple"
                    style={{width: "288px"}}
                    label="Multiple"
                    value={this.state.multiple}
                    onChange={this.handleChange('multiple')}
                    margin="normal"
                />

                <TextField
                    id="price"
                    style={{width: "288px"}}
                    label="Price"
                    value={this.state.price}
                    onChange={this.handleChange('price')}
                    margin="normal"
                />

                <ButtonPrimary style={{marginTop: "30px"}} onClick={this.handleSubmit}>SUBMIT</ButtonPrimary>

            </DialogContainer>
        )
    }
}

const mutationOptions = {
    collection: Inventory,
    fragmentName: 'InventoryItemFragment'
};

registerComponent('EditPart', EditPart, [withEdit, mutationOptions]);

// export default EditPart
