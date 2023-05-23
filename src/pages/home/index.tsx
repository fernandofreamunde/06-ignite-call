import { Heading, Text } from '@ignite-ui/react'
import { Container, Hero, Preview } from './styles'
import previewImage from '../../assets/app-preview.png'
import Image from 'next/image'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading size={'4xl'}>Uncomplicated Scheduling</Heading>
        <Text size={'xl'}>
          Connect your calendar and allow people to schedule appointments in
          your free time.
        </Text>

        <ClaimUsernameForm />
      </Hero>

      <Preview>
        <Image
          src={previewImage}
          alt="Example calendar showing the app in action"
          height={400}
          quality={100}
          priority
        />
      </Preview>
    </Container>
  )
}
