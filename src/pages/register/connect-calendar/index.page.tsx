import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { Container, Header } from '../styles'
import { AuthError, ConnectBox, ConnectItem } from './styles'
import { ArrowRight, Check } from 'phosphor-react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

export default function ConnectCalendar() {
  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error
  const isSignedId = session.status === 'authenticated'

  async function handleConnectCalendar() {
    await signIn('google')
  }

  async function handleNavigateToNextrStep() {
    await router.push('/register/time-intervals')
  }

  return (
    <>
      <NextSeo title="Connect your Calendar | Ignite Call" noindex />

      <Container>
        <Header>
          <Heading as="strong">Connect your Calendar!</Heading>
          <Text>
            Connect your calendar to automatically check busy times and new
            events as they get scheduled.
          </Text>

          <MultiStep size={4} currentStep={2} />
        </Header>

        <ConnectBox>
          <ConnectItem>
            <Text>Google Calendar</Text>

            {isSignedId ? (
              <Button disabled size={'sm'}>
                Connected <Check />
              </Button>
            ) : (
              <Button
                variant="secondary"
                size={'sm'}
                onClick={handleConnectCalendar}
              >
                Connect <ArrowRight />
              </Button>
            )}
          </ConnectItem>

          {hasAuthError && (
            <AuthError>
              Error connecting to Google, please check if you have enabled
              Google Calendar.
            </AuthError>
          )}

          <Button
            type="submit"
            onClick={handleNavigateToNextrStep}
            disabled={!isSignedId}
          >
            Next Step <ArrowRight />
          </Button>
        </ConnectBox>
      </Container>
    </>
  )
}
