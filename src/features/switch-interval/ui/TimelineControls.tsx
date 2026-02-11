import React from "react";
import styled from "styled-components";
import { NavButton } from "@/shared/ui/NavButton";

const ControlsContainer = styled.div`
    position: absolute;
    left: 80px;
    top: 735px;
    z-index: 5;

    @media (max-width: 768px) {
        position: absolute;
        left: 20px;
        bottom: 20px;
        top: auto;
        z-index: 10;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
`;

const Counter = styled.div`
    font-family: 'PT Sans';
    font-size: 14px;
    color: #42567A;
    margin-bottom: 20px;

    @media (max-width: 768px) {
        margin-bottom: 0px;
    }
`;

const NavButtons = styled.div`
    display: flex;
    gap: 20px;

    @media (max-width: 768px) {
        gap: 10px;
    }
`;

interface Props {
    current: number;
    total: number;
    onPrev: () => void;
    onNext: () => void;
}

export const TimelineControls: React.FC<Props> = ({ current, total, onPrev, onNext }) => {
    return (
        <ControlsContainer>
            <Counter>
                { String( current + 1 ).padStart( 2, "0" ) }/{ String( total ).padStart( 2, "0" ) }
            </Counter>

            <NavButtons>
                <NavButton disabled={ current === 0 } onClick={ onPrev }>
                    <svg fill="none" height="14" viewBox="0 0 10 14" width="10">
                        <path d="M8.5 1L2.5 7L8.5 13" stroke="#42567A" strokeWidth="2" />
                    </svg>
                </NavButton>

                <NavButton disabled={ current === total - 1 } onClick={ onNext }>
                    <svg fill="none" height="14" viewBox="0 0 10 14" width="10">
                        <path d="M1.5 1L7.5 7L1.5 13" stroke="#42567A" strokeWidth="2" />
                    </svg>
                </NavButton>
            </NavButtons>
        </ControlsContainer>
    );
};
