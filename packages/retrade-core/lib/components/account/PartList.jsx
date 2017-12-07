import React from 'react';
import styled from 'styled-components'
import {borderRadius, boxShadow, transition} from '../../stylesheets/style.utils.js';
import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button';
import { Link } from 'react-router';


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

export default class PartList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            top: "",
            left: ""
        }
    }


    onFileLoad = (e, file) => {
        /*        console.log(e.target.result, file);
                console.log(e.target.files[0]);*/
    };


    render() {
        return (
            <PartListContainer className="flex-column justify-space-between">
                <div className="flex-row justify-space-between align-center">
                    <h3>Parts</h3>

                    <Button>
                        <div className="flex-row">
                            <i className="fa fa-eye space-right" aria-hidden="true"></i>
                            <Link to={`/part-list`} style={{color: "black", textDecoration: "none"}}>View all</Link>
                        </div>
                    </Button>

                </div>

                <div className="flex-column align-center">
                    <Tooltip id="tooltip-icon" title="Click to view all parts" placement="right">
                        <PartCount className="flex-column align-center justify-center">
                            <Count>0</Count>
                        </PartCount>
                    </Tooltip>
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