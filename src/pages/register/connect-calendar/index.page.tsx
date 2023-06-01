import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { Container, Header } from '../styles'
import { ConnectBox, ConnectItem } from './styles'
import { ArrowRight } from 'phosphor-react'
import { signIn } from 'next-auth/react'

export default function ConnectCalendar() {
  return (
    <Container>
      <Header>
        <Heading as="strong">Connect your Calendar!</Heading>
        <Text>
          Connect your calendar to automatically check busy times and new events
          as they get scheduled.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>

          <Button
            variant="secondary"
            size={'sm'}
            onClick={() => signIn('google')}
          >
            Connect <ArrowRight />
          </Button>
        </ConnectItem>

        <Button type="submit">
          Next Step <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}
