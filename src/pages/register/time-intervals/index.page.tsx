import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@ignite-ui/react'
import { Container, Header } from '../styles'
import {
  IntervalBox,
  IntervalContainer,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
} from './styles'
import { ArrowRight } from 'phosphor-react'

export default function TimeIntervals() {
  return (
    <Container>
      <Header>
        <Heading as="strong">Almost there!</Heading>
        <Text>
          Define the time intervals you want to be available for meetings.
        </Text>

        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox as="form">
        <IntervalContainer>
          <IntervalItem>
            <IntervalDay>
              <Checkbox />
              <Text>Monday</Text>
            </IntervalDay>
            <IntervalInputs>
              <TextInput size={'sm'} type="time" step={60} />
              <TextInput size={'sm'} type="time" step={60} />
            </IntervalInputs>
          </IntervalItem>

          <IntervalItem>
            <IntervalDay>
              <Checkbox />
              <Text>Tuesday</Text>
            </IntervalDay>
            <IntervalInputs>
              <TextInput size={'sm'} type="time" step={60} />
              <TextInput size={'sm'} type="time" step={60} />
            </IntervalInputs>
          </IntervalItem>
        </IntervalContainer>

        <Button type="submit">
          Next Step <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  )
}
