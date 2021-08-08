import { FlexWrap } from "../utils/components";
import { AddBoxOutlined, SubjectOutlined, HomeOutlined } from "@material-ui/icons";
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
                title="Home" 
            >
                <Link to="/writepad_v2/">
                    <IconButton id="home">
                        <HomeOutlined />
                    </IconButton>
                </Link>
            </Tooltip>
            <Tooltip
                arrow
                enterDelay={200}    
                enterNextDelay={500}
                placement="right"
                title="Add Note" 
            >
                <Link to="/writepad_v2/new">
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
                <Link to="/writepad_v2/notelist">
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
        display: none ;
        flex-grow: 0;
    }
`