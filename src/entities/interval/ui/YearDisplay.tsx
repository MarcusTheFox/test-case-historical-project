import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";

const YearsContainer = styled.div`
    position: absolute;
    width: 973px;
    height: 160px;
    left: 50%;
    top: 480px;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 0;
    pointer-events: none;

    @media (max-width: 768px) {
        position: relative;
        width: 100%;
        height: auto;
        left: 0;
        top: 0;
        transform: none;
        padding: 20px 20px;
        margin-top: 20px;
    }
`;

const Year = styled.span<{ color: string }>`
    font-family: 'PT Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 200px;
    line-height: 160px;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${ ( props ) => props.color };

    @media (max-width: 768px) {
        font-size: 56px;
        line-height: 1.2;
        letter-spacing: -0.02em;
    }
`;

interface YearDisplayProps {
    start: number;
    end: number;
}

export const YearDisplay = React.memo(({ start, end }: YearDisplayProps ) => {
    const startRef = useRef<HTMLSpanElement>( null );
    const endRef = useRef<HTMLSpanElement>( null );
    const currentValues = useRef({ start, end });

    useEffect(() => {
        gsap.to( currentValues.current, {
            start: start,
            end: end,
            duration: 1,
            ease: "power2.out",
            onUpdate: () => {
                if ( startRef.current ) {
                    startRef.current.textContent = String( Math.round( currentValues.current.start ));
                }
                if ( endRef.current ) {
                    endRef.current.textContent = String( Math.round( currentValues.current.end ));
                }
            },
        });
    }, [ start, end ]);

    return (
        <YearsContainer>
            <Year ref={ startRef } color="#5D5FEF">{ start }</Year>
            <Year ref={ endRef } color="#EF5DA8">{ end }</Year>
        </YearsContainer>
    );
});

YearDisplay.displayName = "YearDisplay";
