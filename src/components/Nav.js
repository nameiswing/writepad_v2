import { FlexWrap } from "../utils/components";
import { AddBoxOutlined, SubjectOutlined } from "@material-ui/icons";
import { IconButton, Tooltip } from "@material-ui/core";
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <NavWrap direction="column" padding={1} id="nav" shrink={0}>
            <Tooltip
                arrow
                enterDelay={200}    
                enterNextDelay={500}
                placement="right"
                title="Add Note" 
            >
                <Link to="/new">
                    <IconButton id="new-note">
                        <AddBoxOutlined />
                    </IconButton>
                </Link>
            </Tooltip>
            <Tooltip
                arrow
                enterDelay={200}    
                enterNextDelay={500}
                placement="right"
                title="View List" 
            >
                <Link to="/writepad_v2">
                    <IconButton >
                        <SubjectOutlined />
                    </IconButton>
                </Link>
            </Tooltip>
        </NavWrap>
    )
}

export default Nav

const NavWrap = styled(FlexWrap)`
    height: calc(100vh);
    position: relative;
    box-shadow: 0 0 .375rem rgba(0, 0, 0, 0.3);
    width: max-content;

    @media only screen and ( max-width: 500px ) {
        background-color: red;
        display: none !important;
        flex-grow: 0 !important;
    }

`