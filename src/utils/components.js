import styled from 'styled-components';

export const FlexWrap = styled.div`
    display: flex;
    overflow: hidden;
    background-color: ${ props => props.bgcolor };
    flex-grow: ${ props => props.grow };
    flex-shrink: ${ props => props.shrink};
    flex-basis: ${ props => props.basis };
    flex-direction: ${ props => props.direction };
    justify-content: ${ props => props.justifyContent };
    align-items: ${ props => props.align };
    height: ${ props => props.height };
    width: ${ props => props.width };
    margin: ${ props => props.margin };
    padding: ${ props => {
        switch ( props.padding ) {
            case 1: {
                return ".5rem;"
            }
            case 1.1: {
                return ".5rem 1rem;"
            }
            case 2: {
                return "1rem;"
            }
            case 3: {
                return "1.5rem;"
            }
            default: {
                return "0;"
            }
    }
    }};
`
export const FlexItem = styled(FlexWrap)`
    border-radius: 0.25rem;
    font-size: .875rem;
    justify-content: center;
    padding: 0.375rem .5rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: ${ props => props.fontSize };
`