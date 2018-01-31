import React from 'react';
import {withNew, withList, registerComponent} from 'meteor/vulcan:core'
import Papa from 'papaparse'
import styled from 'styled-components'
import {borderRadius, boxShadow, transition} from '../../stylesheets/style.utils.js';
import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button';
import {Link} from 'react-router';
import Inventory from '../../modules/inventory/collection.js'
import withInventoryTotal from '../../containers/withInventoryTotal'
import _ from 'underscore'


const PartListContainer = styled.div`
  background: white;
  width: 500px;
  min-height: 500px;
  padding: 30px;
  margin: 20px;
  ${boxShadow("1px", "1px", "10px", "0", "rgba(0, 0, 0, 0.36)")};
  ${borderRadius("5px")};
`;


const Upload = styled.input`
    display: none;
`;

const UploadButton = styled.label`
    padding: 19px;
    min-width: 320px;
    background: #4abc96;
    color: white;
    text-align: center;
    cursor: pointer;
    width:100%;
    
    ${borderRadius(('5px'))};
    
    &:hover {
      background: #44ac89;
    }
`;

const PartCount = styled.div`
    height: 200px;
    width: 200px;
    border: thin solid lightgray;
    background: white;
    ${borderRadius("50%")};
    ${transition("all", "1s")};
`;

const Count = styled.span`
    font-size: 3em;
    color: gray
`;

let i = 0;

class PartList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            top: "",
            left: ""
        }
    }


    onFileLoad = (e, file) => {
        const props = this.props;
        Papa.parse(e.target.files[0], {
            header: true,
            complete: function (results) {

                addComponentA(props, results)

                /*_.each(results.data, (d) => {
                    const document = {
                        owner: props.user._id,
                        itemNumber: d["Item number"],
                        itemName: d["Item name"],
                        accountCode: d["Account code"],
                        customerRelation: d["Customer relation"],
                        externalItemNumber: d["External item number"],
                        mfm: d["MFM"],
                        info: d["Info"],
                        multiple: d["Multiple"]
                    };

                    props.newMutation({
                        document: document
                    }).then(res=> console.log(res)).catch(err=>console.log(err));
                });*/


            }
        });
    };


    render() {
        return (
            <PartListContainer className="flex-column justify-space-between">
                <div className="flex-row justify-space-between align-center">
                    <h3>Parts</h3>

                    <Link to={`/part-list`} style={{color: "black", textDecoration: "none"}}>
                        <Button>
                            <div className="flex-row">
                                <i className="fa fa-eye space-right" aria-hidden="true"></i>
                                View all
                            </div>
                        </Button>
                    </Link>

                </div>

                <div className="flex-column align-center">
                    {/*<Tooltip id="tooltip-icon" title="Click to view all parts" placement="right">*/}
                        <PartCount className="flex-column align-center justify-center">
                            <Count>{this.props.totalCount}</Count>
                        </PartCount>
                    {/*</Tooltip>*/}
                </div>


                <div className="full-width">
                    <UploadButton htmlFor="file-upload">
                        UPLOAD PARTS
                    </UploadButton>
                    <Upload id="file-upload" type="file" onChange={this.onFileLoad}/>
                </div>

            </PartListContainer>
        )
    }
}

const mutationOptions = {
    collection: Inventory,
    fragmentName: "InventoryItemFragment"
};

const listOptions = {
    collection: Inventory,
    queryName: 'inventoryTotal',
    fragmentName: 'InventoryItemFragment',
};

registerComponent("PartList", PartList, [withNew, mutationOptions], [withList, listOptions]);

// export default withNew(mutationOptions)(PartList)

function addComponentA(props, results) {

    let document = {
        owner: props.user._id,
        itemNumber: results.data[i]["Item number"],
        itemName: results.data[i]["Item name"],
        accountCode: results.data[i]["Account code"],
        customerRelation: results.data[i]["Customer relation"],
        externalItemNumber: results.data[i]["External item number"],
        mfm: results.data[i]["MFM"],
        info: results.data[i]["Info"],
        multiple: results.data[i]["Multiple"]
    };

    props.newMutation({
        document: document
    }).then(res => {
        i++;
        if (results.data[i]) addComponentB(props, results)
    }).catch(err => console.log(err));
}

function addComponentB(props, results) {

    let document = {
        owner: props.user._id,
        itemNumber: results.data[i]["Item number"],
        itemName: results.data[i]["Item name"],
        accountCode: results.data[i]["Account code"],
        customerRelation: results.data[i]["Customer relation"],
        externalItemNumber: results.data[i]["External item number"],
        mfm: results.data[i]["MFM"],
        info: results.data[i]["Info"],
        multiple: results.data[i]["Multiple"]
    };

    props.newMutation({
        document: document
    }).then(res => {
        i++;
        if (results.data[i]) addComponentA(props, results)
    }).catch(err => console.log(err));
}

