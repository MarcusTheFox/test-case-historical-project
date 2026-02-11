import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { TimeInterval } from "@/shared/types";
import { TimelineControls } from "@/features/switch-interval/ui/TimelineControls";
import { EventItem } from "@/entities/interval/ui/EventItem";
import { YearDisplay } from "@/entities/interval/ui/YearDisplay";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const AnimatedSection = styled.div`
    opacity: 0;
    animation: fadeInAndUp 0.8s ease forwards;

    @media (max-width: 768px) {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
    }

    @keyframes fadeInAndUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const CategoryLabel = styled.div`
    display: none;
    @media (max-width: 768px) {
        display: block;
        font-family: 'PT Sans';
        font-weight: 700;
        font-size: 16px;
        color: #42567A;
        padding: 20px 0;
        margin: 0 20px;
        border-bottom: 1px solid rgba(66, 86, 122, 0.1);
    }
`;

const CircleContainer = styled.div`
    position: absolute;
    width: 530px;
    height: 530px;
    left: 50%;
    top: 480px;
    transform: translate(-50%, -50%);
    border: 1px solid rgba(66, 86, 122, 0.2);
    border-radius: 50%;
    z-index: 3;

    @media (max-width: 768px) {
        display: none;
    }
`;

const Point = styled.div<{ active: boolean }>`
    position: absolute;
    width: ${ ( props ) => ( props.active ? "56px" : "6px" ) };
    height: ${ ( props ) => ( props.active ? "56px" : "6px" ) };
    background: ${ ( props ) => ( props.active ? "#F4F5F9" : "#42567A" ) };
    border: ${ ( props ) => ( props.active ? "1px solid rgba(48, 62, 88, 0.5)" : "none" ) };
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;

    &:hover {
        width: 56px;
        height: 56px;
        background: #F4F5F9;
        border: 1px solid rgba(48, 62, 88, 0.5);
    }

    &::after {
        content: attr(data-index);
        font-family: 'PT Sans';
        font-size: 20px;
        color: #42567A;
        opacity: ${ ( props ) => ( props.active ? 1 : 0 ) };
        transition: opacity 0.3s ease;
    }

    &:hover::after {
        opacity: 1;
    }

    & > div {
        opacity: ${ ( props ) => ( props.active ? 1 : 0 ) };
        transition: opacity 0.3s ease;
    }
`;

const PointLabel = styled.div`
    position: absolute;
    left: 70px;
    top: 50%;
    transform: translateY(-50%);
    font-family: 'PT Sans';
    font-weight: 700;
    font-size: 20px;
    color: #42567A;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    white-space: nowrap;
    z-index: 10;
`;

const SliderContainer = styled.div`
    position: absolute;
    width: calc(100% - 160px);
    left: 80px;
    top: 841px;
    z-index: 4;

    .swiper {
        width: 100%;
        overflow: hidden;
    }

    @media (max-width: 768px) {
        position: relative;
        width: 100%;
        left: 0;
        top: 0;
        padding: 0;
        
        .swiper {
            padding: 20px;
        }
    }
`;

const SliderNavButton = styled.div<{ direction: "next" | "prev" }>`
    position: absolute;
    top: 40px;
    ${ ( props ) => ( props.direction === "prev" ? "left: -60px;" : "right: -60px;" ) }
    width: 40px;
    height: 40px;
    background: #FFFFFF;
    box-shadow: 0px 0px 15px rgba(56, 119, 238, 0.1);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 10;
    transition: all 0.3s ease;

    &.swiper-button-disabled {
        opacity: 0;
        pointer-events: none;
    }

    &::after {
        content: '';
        width: 8px;
        height: 8px;
        border-top: 2px solid #3877EE;
        border-right: 2px solid #3877EE;
        transform: rotate(${ ( props ) => ( props.direction === "prev" ? "-135deg" : "45deg" ) });
    }

    @media (max-width: 768px) {
        display: none;
    }
`;

const MobilePagination = styled.div`
    display: none;
    @media (max-width: 768px) {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 25px;
        pointer-events: none;
        z-index: 5;
    }
    
    .swiper-pagination-bullet {
        width: 6px;
        height: 6px;
        background: #42567A;
        opacity: 0.4;
        pointer-events: auto;
        margin: 0 !important;
    }
    
    .swiper-pagination-bullet-active {
        opacity: 1;
    }
`;

const MobileFooter = styled.div`
    @media (max-width: 768px) {
        display: block;
        position: absolute;
        bottom: 20px;
        left: 0;
        width: 100%;
        height: 64px;
        z-index: 20;
        pointer-events: none;

        & > * {
            pointer-events: auto;
        }
        
        & > div:first-child {
            position: absolute;
            left: 20px;
            bottom: 0;
            top: auto;
        }
    }
`;

interface Props {
    data: TimeInterval[];
}

export const HistoricalTimeline: React.FC<Props> = ({ data }) => {
    const [ activeIndex, setActiveIndex ] = useState( 0 );
    const activeInterval = useMemo(() => data[activeIndex], [ data, activeIndex ]);
    const circleRef = useRef<HTMLDivElement>( null );
    const id = React.useId().replace( /:/g, "" );

    useEffect(() => {
        if ( circleRef.current ) {
            const angleStep = 360 / data.length;
            const rotation = -activeIndex * angleStep;
            gsap.to( circleRef.current, {
                rotation: rotation,
                duration: 1,
                ease: "power2.out",
            });

            const pointWrappers = circleRef.current.querySelectorAll( ".point-wrapper" );
            pointWrappers.forEach(( wrapper ) => {
                gsap.to( wrapper, {
                    rotation: -rotation,
                    duration: 1,
                    ease: "power2.out",
                });
            });
        }
    }, [ activeIndex, data.length ]);

    const handleNext = useCallback(() => {
        setActiveIndex(( prev ) => ( prev < data.length - 1 ? prev + 1 : prev ));
    }, [ data.length ]);

    const handlePrev = useCallback(() => {
        setActiveIndex(( prev ) => ( prev > 0 ? prev - 1 : prev ));
    }, []);

    const handlePointClick = useCallback(( index: number ) => {
        setActiveIndex( index );
    }, []);

    const angleStep = 360 / data.length;

    return (
        <>
            <YearDisplay end={ activeInterval.endYear } start={ activeInterval.startYear } />

            <AnimatedSection key={ activeIndex }>
                <CategoryLabel>{ activeInterval.label }</CategoryLabel>

                <SliderContainer>
                    <SliderNavButton className={ `swiper-btn-prev-${ id } swiper-button-disabled` } direction="prev" />

                    <Swiper
                        key={ activeIndex }
                        breakpoints={{
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 80,
                            },
                        }}
                        modules={ [ Navigation, Pagination ] }
                        navigation={{
                            nextEl: `.swiper-btn-next-${ id }`,
                            prevEl: `.swiper-btn-prev-${ id }`,
                        }}
                        pagination={{ clickable: true, el: `.mobile-pagination-bullets-${ id }` }}
                        slidesPerView={ 1.5 }
                        spaceBetween={ 30 }
                    >
                        { activeInterval.events.map(( event, index ) => (
                            <SwiperSlide key={ index }>
                                <EventItem event={ event } />
                            </SwiperSlide>
                        )) }
                    </Swiper>

                    <SliderNavButton className={ `swiper-btn-next-${ id }` } direction="next" />
                </SliderContainer>
            </AnimatedSection>

            <CircleContainer ref={ circleRef }>
                { data.map(( interval, index ) => (
                    <div key={ interval.id }
                        className="point-wrapper"
                        style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: `translate(-50%, -50%) rotate(${ ( index * angleStep ) - 60 }deg) translate(265px)`,
                        }}
                    >
                        <Point
                            active={ index === activeIndex }
                            data-index={ index + 1 }
                            onClick={ () => handlePointClick( index ) }
                        >
                            <PointLabel>{ interval.label }</PointLabel>
                        </Point>
                    </div>
                )) }
            </CircleContainer>

            <MobileFooter>
                <TimelineControls
                    current={ activeIndex }
                    total={ data.length }
                    onNext={ handleNext }
                    onPrev={ handlePrev }
                />

                <MobilePagination className={ `mobile-pagination-bullets-${ id }` } />
            </MobileFooter>
        </>
    );
};
