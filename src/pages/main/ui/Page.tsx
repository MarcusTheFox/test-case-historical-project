import styled from 'styled-components';
import { Container, Content, Title } from '@/shared/ui/Layout';
import { HistoricalTimeline } from '@/widgets/historical-timeline/ui/HistoricalTimeline';
import { data } from '@/shared/data/mock';

const VerticalLine = styled.div<{ left: string }>`
  position: absolute;
  width: 1px;
  height: 100%;
  left: ${props => props.left};
  background: rgba(66, 86, 122, 0.1);
  z-index: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const HorizontalLine = styled.div`
  position: absolute;
  width: 100%;
  height: 1px;
  top: 480px;
  background: rgba(66, 86, 122, 0.1);
  z-index: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MainPage = () => {
    return (
        <>
            <Container>
                <Content>
                    <VerticalLine left="0" />
                    <VerticalLine left="50%" />
                    <VerticalLine left="100%" />
                    <HorizontalLine />

                    <Title>Исторические даты</Title>

                    <HistoricalTimeline data={data} />
                </Content>
            </Container>
            <Container>
                <Content>
                    <VerticalLine left="0" />
                    <VerticalLine left="50%" />
                    <VerticalLine left="100%" />
                    <HorizontalLine />

                    <Title>Исторические даты</Title>

                    <HistoricalTimeline data={data} />
                </Content>
            </Container>
        </>
    );
};
