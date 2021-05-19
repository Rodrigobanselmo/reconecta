// import Close from '@material-ui/icons/Close';
// import BsInfoCircle from '@material-ui/icons/InfoOutlined';
// import BsXOctagon from '@material-ui/icons/ErrorOutlineRounded';
// import BsExclamationTriangle from '@material-ui/icons/WarningRounded';
// import BsCheckCircle from '@material-ui/icons/CheckCircleOutline';
import styled, {css, keyframes} from 'styled-components/macro';
import { FaBeer } from 'react-icons/fa';

export const IconCLose = styled(FaBeer)`

    position: absolute;
    top: 7px;
    right: 8px;
    font-size: 24px;
    cursor:pointer;


    ${props => props.small && css`
        position: absolute;
        top: 7px;
        right: 8px;
        font-size: 14px;
    `}
    &:hover {
        opacity:0.5;
    }

`;

export const IconCheck = styled(FaBeer)`
    margin:13px;
    font-size:23px;
    color:#5cb85c;
    align-self:center;
`;
export const IconWarn = styled(FaBeer)`
    margin:13px;
    font-size:23px;
    color:#c5aa10;
    align-self:center;
`;
export const IconError = styled(FaBeer)`
    /* color: #ae423f; */
    margin:13px;
    font-size:23px;
    color:#bd2f2a;
    align-self:center;
`;
export const IconInfo= styled(FaBeer)`
    /*   color: #4e91d4; */
    margin:13px;
    font-size:23px;
    color:#5bc0de;
    align-self:center;
`;
