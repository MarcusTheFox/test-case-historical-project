import React from "react";
import styled from "styled-components";
import { TimelineEvent } from "@/shared/types";

const EventItemContainer = styled.div`
    width: 100%;
    max-width: 320px;
`;

const EventYear = styled.div`
    font-family: 'Bebas Neue';
    font-size: 25px;
    color: #3877EE;
    text-transform: uppercase;
    margin-bottom: 15px;

    @media (max-width: 768px) {
        font-size: 16px;
        margin-bottom: 10px;
    }
`;

const EventDescription = styled.div`
    font-family: 'PT Sans';
    font-size: 20px;
    line-height: 150%;
    color: #42567A;

    @media (max-width: 768px) {
        font-size: 14px;
        line-height: 1.4;
    }
`;

interface Props {
    event: TimelineEvent;
}

export const EventItem: React.FC<Props> = ({ event }) => {
    return (
        <EventItemContainer>
            <EventYear>{ event.year }</EventYear>
            <EventDescription>{ event.description }</EventDescription>
        </EventItemContainer>
    );
};
