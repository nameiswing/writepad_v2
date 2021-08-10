import { FlexWrap } from "../utils/components";
import { AddBoxOutlined, SubjectOutlined, HomeOutlined, FaceRounded } from "@material-ui/icons";
import { IconButton, Tooltip, Avatar } from "@material-ui/core";
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <NavWrap direction="column" id="nav" shrink={0} grow={0} align="center">
            <Avatar variant="rounded" alt="profile">
                <FaceRounded />
            </Avatar>
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
    box-shadow: 0 0 .375rem rgba(0, 0, 0, 0.3);
    padding: .75rem .5rem;

    @media only screen and ( max-width: 500px ) {
        display: none ;
        flex-grow: 0;
    }
`